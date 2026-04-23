# Encoding Guardrails

Use these rules when editing files that may contain Traditional Chinese or other non-ASCII text.

These guardrails come from lessons already captured in `it-class-tcwu`, especially the PowerShell and prompt-file workflows. They are part of the presentation workspace operating rules because this repo stores briefs, prompts, and deck content that may contain Chinese text.

## Core Rules

- Treat all text files as UTF-8.
- When scripts read or write files, specify UTF-8 explicitly.
- Do not judge Chinese text correctness only from terminal output.
- Do not put Chinese prompt text directly into PowerShell inline commands, here-strings, or heredocs.
- Store Chinese prompt text in UTF-8 files and let tools read from files.
- Keep PowerShell source files ASCII-only when possible.
- If a PowerShell script must emit Chinese text, store that text in a UTF-8 data file or decode it from an ASCII-safe form at runtime.

## Why This Matters

Windows PowerShell and terminal rendering can mangle Chinese text even when the underlying file is still valid UTF-8.

This creates two different risks:

- false alarm: terminal output looks broken, but the file is fine
- real corruption: text is passed through a shell or script path and saved as `???` or mojibake

Avoid both by separating file content, script source, and terminal display.

## Safe Patterns

For prompts:

```text
prompts/<deck-name>/<prompt-pack-name>/01-cover.txt
```

Then run tooling with a file path, not inline Chinese text.

For Node scripts:

```js
fs.readFileSync(promptPath, 'utf8')
fs.writeFileSync(outputPath, content, 'utf8')
```

For Python scripts:

```py
path.read_text(encoding="utf-8")
path.write_text(content, encoding="utf-8")
```

For PowerShell file reads:

```powershell
Get-Content -LiteralPath $Path -Encoding utf8 -Raw
Set-Content -LiteralPath $Path -Encoding utf8 -Value $Content
```

## Unsafe Patterns

Avoid:

- passing Chinese prompt text through `powershell -Command "..."`
- embedding Chinese in PowerShell here-strings and piping it into Node
- using terminal-rendered Chinese as the final source of truth
- continuing to save, export, or commit after seeing `???` in content that should be Chinese
- large shell-based replacements across files with lots of Chinese text

## Verification

Use several signals before deciding whether content is valid:

- UTF-8 file read succeeds
- `git diff` shows expected text
- browser-rendered page looks correct
- screenshot or exported deck page looks correct
- generated prompt file still contains the intended text

For terminal checks, prefer reading files with explicit UTF-8, but remember terminal display can still be misleading.

## Slidecraft-Specific Rules

- Prompt packs in `prompts/` should be UTF-8 text files.
- Chinese prompt text should live in prompt files, not shell command strings.
- Deck source files may contain Chinese, but edits should be small and reviewed through diff or rendered output.
- If a future helper script is added under this repo, it should explicitly read and write UTF-8.
- If a future `.ps1` helper is added, keep the `.ps1` source ASCII-only unless there is a strong reason not to.

## Related Source Lessons

The source project `it-class-tcwu` contains prior guardrails in:

- `docs/development-guidelines.md`
- `docs/development/powershell-encoding.md`
- `docs/wayground-question-bank-skill.md`
- `docs/image-and-preview-card-sop.md`

Those lessons should eventually be extracted into a reusable skill or workflow note, but this repo should keep the application-layer summary here.
