# Naming Conventions

Use these naming rules to keep deck packages easy to scan, copy, and review.

## Deck Slugs

Use one stable slug for each presentation project package.

Recommended format:

```text
<topic-or-client>-<specific-purpose>
```

Examples:

- `new-taipei-school-lunch`
- `spring-parent-orientation`
- `client-product-launch`

Rules:

- use lowercase letters, numbers, and hyphens
- keep names readable and specific
- avoid spaces, underscores, and punctuation
- avoid date-only names
- avoid vague names such as `test`, `demo`, `new`, or `final`

## Standard Package Paths

Use the same deck slug across all top-level folders:

```text
briefs/<deck-name>-brief.md
prompts/<deck-name>/<prompt-pack-name>/
decks/<deck-name>/
exports/<deck-name>/
experiments/<deck-name>/<experiment-name>/
```

Example:

```text
briefs/new-taipei-school-lunch-brief.md
prompts/new-taipei-school-lunch/nano-banana-sequence/
decks/new-taipei-school-lunch/
exports/new-taipei-school-lunch/
experiments/new-taipei-school-lunch/style-comparison/
```

## Prompt Files

Use two-digit prefixes to preserve order:

```text
01-cover.txt
02-policy-origin.txt
03-budget-structure.txt
```

Rules:

- start with `01`
- keep the number aligned with the intended slide or generation order
- use short descriptive names after the number
- prefer `.txt` for single prompts
- use `README.md` for pack-level notes, execution boundary, visual rules, and output handling

## Prompt Pack Names

Use names that describe the visual or generation intent.

Examples:

- `nano-banana-sequence`
- `cover-variants`
- `brand-character-study`
- `minimal-policy-visuals`

Avoid names that describe internal tooling instead of the deck output.

## Deck Working Files

Common names:

```text
decks/<deck-name>/README.md
decks/<deck-name>/slides.html
decks/<deck-name>/export-pdf.js
decks/<deck-name>/notes/production-notes.md
```

Use clear names for additional working files:

```text
slides-v0-2.html
layout-study.html
speaker-notes.md
review-notes.md
```

Avoid:

- `final.html` for working files
- `new.html`
- `copy.html`
- `final-final.html`

## Image Files

For selected deck images, prefer stable slide-aligned names:

```text
decks/<deck-name>/images/01-cover.png
decks/<deck-name>/images/02-context.png
decks/<deck-name>/images/03-key-point.png
```

For generated images under `exports/`, keep original filenames if they are useful for traceability, but add ordering prefixes when possible:

```text
exports/<deck-name>/generated-images/01-<original-name>.png
exports/<deck-name>/rendered-pages/01.png
```

## Final Deliverables

Put final deliverables in:

```text
decks/<deck-name>/final/
```

Recommended names:

```text
<deck-name>.pdf
<deck-name>-v1.0.pdf
<deck-name>-presentation.pdf
```

If multiple final formats exist, keep the slug stable:

```text
new-taipei-school-lunch.pdf
new-taipei-school-lunch.pptx
new-taipei-school-lunch-preview.zip
```

Avoid:

- `final.pdf`
- `final-final.pdf`
- `presentation.pdf`
- date-only final filenames

## Version Labels

Use simple semantic milestones in notes and README files:

```text
v0.1: initial brief and visual direction
v0.2: first composed deck draft
v1.0: final exported deliverable
```

Use dates inside notes when they help review context, but do not rely on dates as the only version identifier.

## Status Labels

Use these exact labels:

- `exploration`
- `working`
- `final`

Do not invent near-duplicates such as `draft`, `done`, `complete`, or `published` unless the repo conventions are intentionally updated.
