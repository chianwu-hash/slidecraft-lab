import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const opts = {
    port: process.env.CDP_PORT || "9222",
    host: process.env.CDP_HOST || "127.0.0.1",
    promptDir: null,
    outputDir: null,
    start: 1,
    end: 14,
    targetUrlIncludes: "chatgpt.com",
    waitMs: 300000,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--port" && argv[i + 1]) opts.port = argv[++i];
    else if (arg === "--host" && argv[i + 1]) opts.host = argv[++i];
    else if (arg === "--prompt-dir" && argv[i + 1]) opts.promptDir = argv[++i];
    else if (arg === "--output-dir" && argv[i + 1]) opts.outputDir = argv[++i];
    else if (arg === "--start" && argv[i + 1]) opts.start = Number(argv[++i]);
    else if (arg === "--end" && argv[i + 1]) opts.end = Number(argv[++i]);
    else if (arg === "--target-url-includes" && argv[i + 1]) opts.targetUrlIncludes = argv[++i];
    else if (arg === "--wait-ms" && argv[i + 1]) opts.waitMs = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!opts.promptDir || !opts.outputDir) {
    throw new Error(
      "Usage: node tools/run-chatgpt-image-sequence.mjs --port 9333 --prompt-dir <dir> --output-dir <dir> [--start 2] [--end 14]"
    );
  }

  return opts;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CdpPage {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !this.pending.has(message.id)) return;
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    });
  }

  async open() {
    await new Promise((resolve) => this.ws.addEventListener("open", resolve, { once: true }));
    await this.send("Runtime.enable");
    await this.send("Network.enable");
    await this.send("Page.bringToFront");
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  close() {
    this.ws.close();
  }
}

async function findPage(opts) {
  const baseUrl = `http://${opts.host}:${opts.port}`;
  const list = await (await fetch(`${baseUrl}/json/list`)).json();
  const page = list.find((item) => item.type === "page" && item.url.includes(opts.targetUrlIncludes));
  if (!page) throw new Error(`No matching page for ${opts.targetUrlIncludes} at ${baseUrl}`);
  return page;
}

async function evalJson(page, expression) {
  const result = await page.send("Runtime.evaluate", { returnByValue: true, expression });
  return result.result.value;
}

async function getImageSources(page) {
  return evalJson(
    page,
    `(() => {
      const seen = new Set();
      return [...document.images]
        .map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.alt || "",
          w: img.naturalWidth || 0,
          h: img.naturalHeight || 0
        }))
        .filter((img) => img.src.includes("/backend-api/estuary/content"))
        .filter((img) => {
          const id = new URL(img.src).searchParams.get("id") || img.src;
          if (seen.has(id)) return false;
          seen.add(id);
          img.id = id;
          return true;
        });
    })()`
  );
}

async function submitPrompt(page, prompt) {
  const focus = await evalJson(
    page,
    `(() => {
      const composer =
        document.querySelector("#prompt-textarea") ||
        document.querySelector("textarea") ||
        document.querySelector('[contenteditable="true"][role="textbox"]') ||
        document.querySelector('[contenteditable="true"]');
      if (!composer) return { ok: false, reason: "composer not found" };
      composer.focus();
      return { ok: true };
    })()`
  );
  if (!focus.ok) throw new Error(JSON.stringify(focus));

  await page.send("Input.insertText", { text: prompt });
  await sleep(700);

  let sent = { ok: false, reason: "send button not checked" };
  for (let attempt = 0; attempt < 20; attempt++) {
    sent = await evalJson(
      page,
      `(() => {
      const candidates = [
        '[data-testid="send-button"]',
        '#composer-submit-button',
        'button[aria-label*="Send"]',
        'button[aria-label*="送出"]',
        'button[aria-label*="Submit"]',
        'button[aria-label*="傳送"]'
      ];
      for (const selector of candidates) {
        const button = document.querySelector(selector);
        if (button && !button.disabled) {
          button.click();
          return { ok: true, selector };
        }
      }
      const buttons = [...document.querySelectorAll("button")].filter((button) => !button.disabled);
      const button = buttons.find((button) => /send|submit|送出|傳送|arrow/i.test(button.getAttribute("aria-label") || button.textContent || ""));
      if (button) {
        button.click();
        return { ok: true, selector: "fallback" };
      }
      return { ok: false, reason: "send button not found" };
    })()`
    );
    if (sent.ok) {
      await sleep(1500);
      const accepted = await evalJson(
        page,
        `(() => {
          const composer =
            document.querySelector("#prompt-textarea") ||
            document.querySelector("textarea") ||
            document.querySelector('[contenteditable="true"][role="textbox"]') ||
            document.querySelector('[contenteditable="true"]');
          const text = (composer?.innerText || composer?.value || "").trim();
          const stopButton =
            document.querySelector('[data-testid="stop-button"]') ||
            document.querySelector('button[aria-label*="Stop"]') ||
            document.querySelector('button[aria-label*="停止"]');
          return { ok: !text || Boolean(stopButton), textLength: text.length, hasStopButton: Boolean(stopButton) };
        })()`
      );
      if (accepted.ok) break;
      sent = { ok: false, reason: "prompt still in composer", ...accepted };
    }
    await sleep(500);
  }
  if (!sent.ok) throw new Error(JSON.stringify(sent));
}

async function waitForNewImage(page, beforeIds, waitMs) {
  const started = Date.now();
  while (Date.now() - started < waitMs) {
    await sleep(5000);
    const images = await getImageSources(page);
    const fresh = images.filter((img) => !beforeIds.has(img.id));
    if (fresh.length) {
      await sleep(5000);
      return fresh[fresh.length - 1];
    }
    const body = await evalJson(page, `(() => document.body.innerText.slice(-500))()`);
    console.log(`[wait] ${Math.round((Date.now() - started) / 1000)}s ${body.includes("正在建立圖像") ? "generating" : "waiting"}`);
  }
  throw new Error(`Timed out after ${waitMs}ms waiting for a new image`);
}

async function downloadImage(page, image, outputPath, referer) {
  const cookiesResult = await page.send("Network.getCookies", { urls: ["https://chatgpt.com/"] });
  const cookieHeader = cookiesResult.cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
  const response = await fetch(image.src, {
    headers: {
      Cookie: cookieHeader,
      Referer: referer,
      "User-Agent": "Mozilla/5.0",
    },
  });
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, bytes);
  return bytes.length;
}

async function loadPromptFiles(promptDir) {
  const entries = await readdir(promptDir);
  const files = new Map();
  for (const entry of entries) {
    const match = /^(\d{2})-.+\.txt$/.exec(entry);
    if (!match || match[1] === "00") continue;
    files.set(Number(match[1]), entry);
  }
  return files;
}

const opts = parseArgs(process.argv.slice(2));
await mkdir(opts.outputDir, { recursive: true });
const promptFiles = await loadPromptFiles(opts.promptDir);

const browserPage = await findPage(opts);
const cdp = new CdpPage(browserPage.webSocketDebuggerUrl);
await cdp.open();

try {
  for (let number = opts.start; number <= opts.end; number++) {
    const fileName = promptFiles.get(number);
    if (!fileName) throw new Error(`No prompt filename for slide ${number}`);
    const promptPath = path.resolve(opts.promptDir, fileName);
    const prompt = await readFile(promptPath, "utf8");
    const before = await getImageSources(cdp);
    const beforeIds = new Set(before.map((img) => img.id));
    console.log(`[slide ${String(number).padStart(2, "0")}] sending ${fileName}; existing images: ${before.length}`);
    await submitPrompt(cdp, prompt);
    const image = await waitForNewImage(cdp, beforeIds, opts.waitMs);
    const outputPath = path.resolve(opts.outputDir, fileName.replace(".txt", ".png"));
    const bytes = await downloadImage(cdp, image, outputPath, browserPage.url);
    console.log(`[slide ${String(number).padStart(2, "0")}] saved ${outputPath} (${bytes} bytes, ${image.w}x${image.h})`);
  }
} finally {
  cdp.close();
}
