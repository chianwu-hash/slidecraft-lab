# ChatGPT Image Sequence: AI 行政工作台

This prompt pack generates a full-slide image sequence for the `AI 行政工作台` proposal deck using ChatGPT web image generation.

## Purpose

Create visual-first 16:9 slide images for a school proposal deck that introduces an AI administrative workbench and requests a first-stage `ChatGPT Pro` workbench-building account.

## How To Use

1. Open ChatGPT web and start an image-generation capable chat.
2. Send `00-style-primer.txt` first.
3. Send `01-cover.txt` through `14-closing.txt` one by one.
4. Download each generated image.
5. Save review-stage images under:

```text
exports/ai-admin-workbench/chatgpt-image-sequence/
```

6. Copy selected final images into:

```text
decks/ai-admin-workbench/images/
```

7. Export the selected images as an image-only PDF.

## Visual Continuity

- 16:9 landscape slide image
- elementary-school administrative proposal deck
- warm paper background, deep green, ink black, soft gold, muted administrative blue
- school office, folders, forms, calendars, checklists, Codex desktop workspace, browser workbench, file tree and chat collaboration panel
- Traditional Chinese text, large and legible
- formal but approachable
- avoid futuristic sci-fi style
- avoid enterprise-marketing visuals
- avoid small dense text
- no logos, no watermarks

## Text Strategy

This deck intentionally uses full-page generation, so every prompt asks for only a small amount of large Traditional Chinese text.

If a generated slide has broken Chinese text:

- regenerate that slide in the same ChatGPT chat first
- keep the best visual candidate in `exports/`
- only promote reviewed images into `decks/ai-admin-workbench/images/`

## Sensitive Content Guardrails

- Do not show real personal data.
- Do not show credentials, tokens, calendar IDs, or official document numbers.
- Do not use principal calendar content as a case.
- Do not describe the Pro account as a shared account.
- Use generic screens and symbolic workflow diagrams, not real system screenshots.
