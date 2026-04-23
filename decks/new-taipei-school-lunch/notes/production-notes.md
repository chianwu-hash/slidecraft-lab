# Production Notes

Deck: `new-taipei-school-lunch`

## Current Status

Status: final

This is the first complete reference deck package in `slidecraft-lab`.

## Decisions

- decision: Keep this deck as the canonical first sample.
  rationale: It includes a brief, prompt pack, generated images, composed HTML deck, rendered page previews, and final PDF.
- decision: Keep browser/session execution outside this repo.
  rationale: The prompt pack belongs here, but reusable Gemini/browser workflow belongs in `browser-automation-workflow`.
- decision: Keep selected deck images under `decks/new-taipei-school-lunch/images/`.
  rationale: These images are referenced by the composed deck source.
- decision: Keep reviewable generated and rendered outputs under `exports/new-taipei-school-lunch/`.
  rationale: Review artifacts should stay separate from the canonical deck source.

## Review Notes

- source brief exists at `briefs/new-taipei-school-lunch-brief.md`
- prompt pack exists at `prompts/new-taipei-school-lunch/nano-banana-sequence/`
- composed deck source exists at `decks/new-taipei-school-lunch/slides.html`
- rendered page previews exist at `exports/new-taipei-school-lunch/rendered-pages/`
- final PDF exists at `decks/new-taipei-school-lunch/final/new-taipei-school-lunch-presentation-nano.pdf`

## Visual Notes

- what is working: warm policy-presentation tone with a consistent education-oriented visual style
- what needs revision: no immediate revision planned; future cleanup could rename selected images to stable slide-aligned names
- image consistency issues: none documented in this package yet
- typography or layout issues: no known final-blocking issue documented

## Brand Review

- brand fit: sample is policy and school-context oriented rather than a strict client brand package
- logo or mascot issues: no reusable brand package documented
- palette consistency: warm educational palette is used across the composed deck
- off-brand risks: not currently documented
- approval notes: this sample is treated as an internal reference deck package

## Version History

- v0.1: source material condensed into a deck brief
- v0.2: same-chat prompt sequence generated the visual image set
- v0.3: HTML deck composed from selected generated images
- v1.0: final PDF exported and sample migrated into `slidecraft-lab`

## Open Questions

- Should selected deck images be renamed to stable slide-aligned names such as `01-cover.png`?
- Should the sample receive a more detailed slide-by-slide review note later?
- Should a future branded variant be tracked as an experiment rather than replacing this sample?

## Handoff Notes

Use this deck as the current reference for repo conventions, not as a browser automation example.

For workflow and conventions, see:

- [docs/sample-deck-walkthrough.md](</c:/Users/user/projects/slidecraft-lab/docs/sample-deck-walkthrough.md:1>)
- [docs/deck-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/deck-conventions.md:1>)
- [docs/prompt-pack-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/prompt-pack-conventions.md:1>)

## Final Review Checklist

- generated images reviewed: yes, selected images are present in the deck package
- rendered pages reviewed: rendered page previews exist in `exports/new-taipei-school-lunch/rendered-pages/`
- final deliverable exported: yes
- final deliverable location: `decks/new-taipei-school-lunch/final/new-taipei-school-lunch-presentation-nano.pdf`
- deck README updated: yes
- status updated: yes, `final`
