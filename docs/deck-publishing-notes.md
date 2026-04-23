# Deck Publishing Notes

Use these notes when preparing a deck package for handoff, sharing, or publication.

Publishing in `slidecraft-lab` means preparing the application-layer deliverables and package notes. It does not mean adding reusable browser automation or deployment infrastructure.

## Publishing Goals

Before sharing a deck, make sure:

- final deliverables are in the expected location
- the deck README reflects the current status
- exported previews are available when useful
- source brief and prompt pack references are clear
- known limitations are documented
- no experimental artifact is mistaken for the final deck

## Final Deliverables

Final deliverables belong in:

```text
decks/<deck-name>/final/
```

Recommended files:

```text
<deck-name>.pdf
<deck-name>-presentation.pdf
<deck-name>-v1.0.pdf
```

If a deck has multiple deliverable formats, keep the same deck slug:

```text
<deck-name>.pdf
<deck-name>.pptx
<deck-name>-preview.zip
```

## Previews

Use rendered page previews for review or handoff:

```text
exports/<deck-name>/rendered-pages/
```

Preview images are useful for:

- quick visual QA
- sharing page-by-page review context
- comparing exported output to the working deck

## README Handoff

Before publishing, update:

```text
decks/<deck-name>/README.md
```

Include:

- current status
- final deliverable path
- related brief
- related prompt pack
- related exports
- version notes when relevant
- known issues or follow-up notes

## Status

Use `final` only when:

- final deliverable exists
- review issues are resolved or intentionally accepted
- package README is updated
- final output has been opened or visually checked

Use `working` if the deck is shareable for review but not yet approved.

Use `exploration` if the source, visual direction, or prompt approach is still unsettled.

## What Not To Publish

Do not treat these as final deliverables:

- exploratory images inside `experiments/`
- unreviewed generated images
- old rendered pages from a previous deck version
- temporary browser screenshots
- automation logs

If a file is useful for traceability but not part of the deck package, keep it in `exports/` or `experiments/` with notes.

## Publishing Checklist

Before handoff:

- final PDF or presentation export exists in `decks/<deck-name>/final/`
- final file opens successfully
- page count matches the intended deck
- rendered previews are current if previews are used
- deck README status is correct
- production notes capture important decisions
- prompt pack location is documented
- selected images are in `decks/<deck-name>/images/`
- experiments are not confused with canonical deck assets

For deeper QA, use [export-review-checklist.md](</c:/Users/user/projects/slidecraft-lab/docs/export-review-checklist.md:1>).
