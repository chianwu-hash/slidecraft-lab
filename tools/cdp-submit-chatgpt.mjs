import { readFile } from "node:fs/promises";

function parseArgs(argv) {
  const opts = {
    port: process.env.CDP_PORT || "9222",
    host: process.env.CDP_HOST || "127.0.0.1",
    promptPath: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--port" && argv[i + 1]) {
      opts.port = argv[++i];
    } else if (arg === "--host" && argv[i + 1]) {
      opts.host = argv[++i];
    } else if (!opts.promptPath) {
      opts.promptPath = arg;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return opts;
}

const opts = parseArgs(process.argv.slice(2));
if (!opts.promptPath) {
  throw new Error(
    "Usage: node cdp-submit-chatgpt.mjs [--port 9333] [--host 127.0.0.1] <prompt-file>"
  );
}

const baseUrl = `http://${opts.host}:${opts.port}`;
const prompt = await readFile(opts.promptPath, "utf8");
const list = await (await fetch(`${baseUrl}/json/list`)).json();
const page = list.find((item) => item.type === "page" && item.url.includes("chatgpt.com"));
if (!page) throw new Error(`ChatGPT page not found at ${baseUrl}`);

const ws = new WebSocket(page.webSocketDebuggerUrl);
let nextId = 1;
const pending = new Map();

ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});

function send(method, params = {}) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
await send("Runtime.enable");
await send("Page.bringToFront");

const focusResult = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const composer =
      document.querySelector("#prompt-textarea") ||
      document.querySelector("textarea") ||
      document.querySelector('[contenteditable="true"][role="textbox"]') ||
      document.querySelector('[contenteditable="true"]');
    if (!composer) return { ok: false, reason: "composer not found" };
    composer.focus();
    return { ok: true, tag: composer.tagName, role: composer.getAttribute("role") };
  })()`
});

if (!focusResult.result.value?.ok) {
  throw new Error(JSON.stringify(focusResult.result.value));
}

await send("Input.insertText", { text: prompt });
await sleep(800);

const sendResult = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const candidates = [
      '[data-testid="send-button"]',
      'button[aria-label*="Send"]',
      'button[aria-label*="送出"]',
      'button[aria-label*="Submit"]'
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
});

console.log(JSON.stringify({
  focused: focusResult.result.value,
  sent: sendResult.result.value,
  cdp: { host: opts.host, port: opts.port },
  promptLength: prompt.length
}, null, 2));

await sleep(3000);
const status = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => ({
    title: document.title,
    url: location.href,
    sample: (document.body.innerText || "").slice(-1500)
  }))()`
});
console.log(JSON.stringify(status.result.value, null, 2));
ws.close();
