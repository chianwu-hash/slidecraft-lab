# Sample Deck Walkthrough

Use `new-taipei-school-lunch` as the current reference deck package for this repo.

This walkthrough shows how the first sample maps to the repo conventions. It is not a browser automation guide.

## Sample Package

Deck slug:

```text
new-taipei-school-lunch
```

Current status:

```text
final
```

The sample demonstrates:

- source brief
- deck-specific prompt pack
- same-chat generated image sequence
- curated image set
- composed HTML deck
- rendered page previews
- final PDF deliverable

## Source Brief

Brief:

```text
briefs/new-taipei-school-lunch-brief.md
```

The brief captures:

- topic and policy source
- presentation goal
- visual direction
- expected deck output locations

This file is the source interpretation layer. It should stay focused on what the presentation needs to communicate, not how browser automation runs.

## Prompt Pack

Prompt pack:

```text
prompts/new-taipei-school-lunch/nano-banana-sequence/
```

This folder contains ordered prompt files:

```text
01-cover-base.txt
02-policy-origin.txt
03-budget-structure.txt
...
09-closing.txt
```

The prompt pack belongs in `slidecraft-lab` because it is deck-specific creative direction.

The actual browser/session execution belongs in `browser-automation-workflow`.

## Generated Images

Review-stage generated images:

```text
exports/new-taipei-school-lunch/generated-images/
```

Selected deck images:

```text
decks/new-taipei-school-lunch/images/
```

This sample currently keeps a selected copy under the deck folder and a reviewable copy under exports. That matches the convention:

- `exports/` keeps review-stage or approved artifacts
- `decks/` keeps the canonical assets referenced by the composed deck

## Deck Assembly

Deck source:

```text
decks/new-taipei-school-lunch/slides.html
```

Deck export helper:

```text
decks/new-taipei-school-lunch/export-pdf.js
```

This helper is deck-specific. Reusable browser automation or shared workflow helpers should stay outside this repo.

## Rendered Pages

Rendered page previews:

```text
exports/new-taipei-school-lunch/rendered-pages/
```

Use these images for visual QA:

- slide order
- layout correctness
- image crops
- text readability
- final page-by-page review

## Final Deliverable

Final PDF:

```text
decks/new-taipei-school-lunch/final/new-taipei-school-lunch-presentation-nano.pdf
```

Final deliverables belong under `decks/<deck-name>/final/` because they are part of the canonical deck package.

## What This Sample Teaches

This sample should be treated as the current working example for:

- how to name a deck package
- where to store source brief material
- how to keep prompt packs deck-specific
- how to separate generated review artifacts from selected deck assets
- how to keep final deliverables with the deck package
- how to avoid pulling browser automation infrastructure into `slidecraft-lab`

## Gaps To Improve Later

The sample is complete enough to serve as a reference, but future cleanup can make it stronger:

- add an exports README with selected review criteria if more variants exist
- rename selected deck images to stable slide-aligned names if traceability allows
- add a slide-by-slide review note if the sample becomes a teaching reference
