const list = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const page = list.find((item) => item.type === "page" && item.url.includes("chatgpt.com"));
if (!page) throw new Error("ChatGPT page not found");

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

await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
await send("Runtime.enable");
await send("Page.bringToFront");

const result = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const text = document.body.innerText || "";
    const composer =
      document.querySelector("#prompt-textarea") ||
      document.querySelector("textarea") ||
      document.querySelector('[contenteditable="true"]');
    return {
      title: document.title,
      url: location.href,
      hasComposer: Boolean(composer),
      composerTag: composer ? composer.tagName : null,
      composerRole: composer ? composer.getAttribute("role") : null,
      textSample: text.slice(0, 500)
    };
  })()`
});

console.log(JSON.stringify(result.result.value, null, 2));
ws.close();
