# Prompt Pack Conventions

Use this guide when creating or reviewing prompt packs for a deck package.

Prompt packs are application-layer assets. They capture deck-specific creative direction, slide intent, visual continuity, and output handling. They are not browser automation scripts.

## Standard Location

Use this structure:

```text
prompts/<deck-name>/<prompt-pack-name>/
prompts/<deck-name>/<prompt-pack-name>/README.md
prompts/<deck-name>/<prompt-pack-name>/01-cover.txt
prompts/<deck-name>/<prompt-pack-name>/02-context.txt
```

Examples:

```text
prompts/new-taipei-school-lunch/nano-banana-sequence/
prompts/new-taipei-school-lunch/nano-banana-sequence/01-cover-base.txt
```

## README Requirements

Each prompt pack should include a `README.md` that explains:

- which deck package it belongs to
- what the prompt pack generates
- whether prompts are intended to run in one same-chat sequence or as independent variants
- visual continuity rules
- brand rules
- model or tool assumptions
- execution boundary
- output handling
- known issues or selection rationale

The README should make it possible to understand the prompt pack without opening every prompt file.

## Prompt File Naming

Use two-digit prefixes to preserve order:

```text
01-cover.txt
02-policy-origin.txt
03-budget-structure.txt
```

Rules:

- start with `01`
- keep prompt order aligned with intended slide or generation order
- use short descriptive names after the prefix
- prefer `.txt` for individual prompt files
- keep pack-level notes in `README.md`, not repeated in every prompt unless needed

## Same-Chat Sequences

Use same-chat sequences when the deck needs strong continuity across generated images.

Good same-chat sequence prompts should keep these elements stable:

- lead character or mascot
- color palette
- visual style
- setting or world
- recurring design motifs
- typography direction when relevant
- aspect ratio and presentation format

Change these elements per slide:

- scene content
- information focus
- composition emphasis
- slide title or topic
- objects needed for that slide

Avoid rewriting the entire art direction in every prompt. Repeating too much can make the sequence harder to steer and harder to review.

## Independent Variants

Use independent prompt variants when exploring:

- cover options
- style comparisons
- model comparisons
- brand balance tests
- layout directions

Store exploratory variants under a clearly named prompt pack or in `experiments/<deck-name>/` if the work should not be treated as canonical.

## Brand And Continuity Rules

Put reusable visual rules in the prompt pack README:

- palette
- logo usage
- mascot or character usage
- style references
- tone words
- must-avoid elements

Put slide-specific visual instructions in individual prompt files.

If brand material is reused across decks, store the asset source under:

```text
assets/<brand-or-client>/
```

If it is only used by one deck, reference it from the deck package notes or selected image set.

## Encoding Rules

Prompt files may contain Traditional Chinese or other non-ASCII text.

Follow [encoding-guardrails.md](</c:/Users/user/projects/slidecraft-lab/docs/encoding-guardrails.md:1>):

- store prompt text in UTF-8 files
- do not pass Chinese prompt text through PowerShell inline commands
- do not use terminal-rendered Chinese as the final source of truth
- read prompt files with explicit UTF-8 in scripts
- stop and verify if generated or saved text becomes `???` or mojibake

## Execution Boundary

Prompt packs belong in `slidecraft-lab`.

Browser/session execution belongs in `browser-automation-workflow`.

This repo may document how a prompt pack should be used, but should not absorb reusable automation internals such as:

- browser session setup
- Gemini session control
- general prompt sequencing scripts
- download or capture infrastructure

## Output Handling

Use these locations after generation:

```text
exports/<deck-name>/generated-images/
decks/<deck-name>/images/
exports/<deck-name>/rendered-pages/
```

Recommended handling:

- save review-stage generated outputs under `exports/<deck-name>/generated-images/`
- copy selected images used by the deck into `decks/<deck-name>/images/`
- keep rendered page previews under `exports/<deck-name>/rendered-pages/`
- record selection rationale in `decks/<deck-name>/notes/` when useful

## Full-Page Generation Prompt Packs

When the image model generates complete slide pages, include deck-wide rules for fixed overlays and safe zones.

Recommended default:

```text
Reserve overlay-safe corners: keep the top-right corner clear for the official crest or logo, and keep the bottom-left corner clear for the page-number badge. Do not place text, icons, metrics, mascots, charts, or important objects in those two corners.
```

Each individual prompt should also remind the model:

```text
Do not create a page number badge. Do not create any crest, logo, seal, stamp, or official emblem. Leave the bottom-left and top-right corners empty for code overlay.
```

For a reusable starter, copy `templates/deck-template/deck-wide-rules.md`.

## Review Checklist

Before using generated images in a deck, check:

- prompt order matches intended slide order
- generated images match slide intent
- visual continuity is acceptable
- brand fit is acceptable
- overlay-safe zones are clear when code overlays will be applied
- no unwanted text artifacts appear
- selected images are available in `decks/<deck-name>/images/`
- review-stage artifacts are organized under `exports/<deck-name>/`

For final output review, use [export-review-checklist.md](</c:/Users/user/projects/slidecraft-lab/docs/export-review-checklist.md:1>).
