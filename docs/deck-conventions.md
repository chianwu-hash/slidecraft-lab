# Deck Conventions

In this repo, a deck means a complete presentation project package, not only the final exported file.

## Required Package Pieces

A standard deck package should have enough context to recreate, review, and deliver the presentation without mixing in browser automation internals.

Required pieces:

- `briefs/<deck-name>-brief.md`
  source summary, audience, presentation goal, narrative direction, and key constraints
- `prompts/<deck-name>/`
  deck-specific prompt packs, model notes, prompt variants, and image-generation sequencing notes
- `decks/<deck-name>/README.md`
  package overview, current status, related files, output location, and version notes
- `decks/<deck-name>/slides.html`
  composed deck working file when the deck is HTML-based
- `decks/<deck-name>/images/`
  selected images used by the composed deck
- `decks/<deck-name>/notes/`
  production notes, review notes, iteration decisions, and version explanations
- `decks/<deck-name>/final/`
  final deliverables for this deck package
- `exports/<deck-name>/`
  review-stage generated images, rendered page previews, and approved export artifacts

Optional pieces:

- `assets/<brand-or-client>/`
  reusable brand assets shared across multiple deck packages
- `experiments/<deck-name>/`
  exploratory tests that should not be treated as the canonical deck source
- `decks/<deck-name>/export-pdf.js`
  deck-specific export helper when needed

For a starter set of these documents, use [templates/deck-template/README.md](</c:/Users/user/projects/slidecraft-lab/templates/deck-template/README.md:1>).

## Naming Rules

Use stable, readable, lowercase slugs:

- deck slug: `new-taipei-school-lunch`
- brief: `briefs/new-taipei-school-lunch-brief.md`
- prompt folder: `prompts/new-taipei-school-lunch/<prompt-pack-name>/`
- deck folder: `decks/new-taipei-school-lunch/`
- export folder: `exports/new-taipei-school-lunch/`
- experiment folder: `experiments/new-taipei-school-lunch/<experiment-name>/`

Prefer:

- lowercase letters, numbers, and hyphens
- two-digit slide or prompt prefixes, such as `01-cover.txt`
- descriptive prompt-pack names, such as `nano-banana-sequence`

Avoid:

- spaces in canonical folder names
- date-only deck names
- ambiguous names such as `final-final`, `test`, or `new`
- automation-script names as prompt-pack names unless they describe the deck output

For the full naming guide, see [naming-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/naming-conventions.md:1>).

## Folder Responsibilities

`briefs/` owns source interpretation:

- condensed source notes
- presentation goals
- audience and tone
- narrative outline
- constraints that affect the deck

`prompts/` owns prompt inputs:

- deck-specific prompt packs
- same-chat sequence prompts
- model-specific prompt variants
- prompt notes needed to reproduce visual direction

`assets/` owns reusable brand material:

- logos
- mascots
- type references
- color references
- image references used across more than one deck

`decks/` owns the canonical composed presentation package:

- working deck files
- selected local images used by the deck
- deck README
- production notes
- final deliverables

`exports/` owns reviewable output artifacts:

- generated images selected for review
- rendered slide previews
- approved export artifacts
- files useful for review but not necessarily canonical working source

`experiments/` owns non-canonical exploration:

- prompt A/B tests
- model comparisons
- layout studies
- brand-integration trials

## Deliverables And Working Files

Final deliverables belong in:

```text
decks/<deck-name>/final/
```

Examples:

- final PDF
- final presentation export
- client-ready packaged output

Working files belong in:

```text
decks/<deck-name>/
```

Examples:

- `slides.html`
- `export-pdf.js`
- local composition files
- deck-specific notes or scripts

Do not put reusable browser automation helpers here. If a helper is meant to run many unrelated deck workflows, keep it in `browser-automation-workflow`.

## AI Generated Images

Use `exports/<deck-name>/generated-images/` for reviewed or review-stage generated images.

Use `decks/<deck-name>/images/` for the selected image set actually referenced by the composed deck.

This separation lets the repo keep:

- raw or reviewed generation outputs in `exports/`
- curated deck source assets in `decks/`

## Production Notes And Versions

Use `decks/<deck-name>/notes/` for:

- production decisions
- design rationale
- review comments
- version notes
- known issues
- follow-up ideas

If a deck has meaningful version milestones, add a short section to `decks/<deck-name>/README.md`:

```text
## Status

Status: working

## Versions

- v0.1: first visual direction
- v0.2: revised narrative and slide order
- v1.0: final exported PDF
```

## Deck Status

Use one of these status labels in each deck README:

- `exploration`
  source, outline, visual direction, or prompt approach is still being discovered
- `working`
  deck package has a chosen direction and is actively being assembled or reviewed
- `final`
  final deliverable exists and the package represents the current approved version

Status labels are intentionally lightweight. They help collaborators understand where to look and what level of stability to expect.
