# Export Review Checklist

Use this checklist before treating a deck package as `final`.

This checklist is about presentation quality, artifact placement, and handoff readiness. It does not define browser automation implementation details.

## Generated Image Review

Before moving generated images into the composed deck, check:

- image matches the brief and slide intent
- visual style is consistent across the sequence
- character, mascot, or recurring subject remains stable
- brand colors and tone are acceptable
- no unwanted text artifacts, watermarks, logos, or distorted details
- image is high enough quality for the final deck format
- selected images are copied or referenced from `decks/<deck-name>/images/`
- review-stage images remain organized under `exports/<deck-name>/generated-images/`

## Slide Review

Before exporting the final deck, check:

- slide order matches the brief or latest narrative decision
- each slide has a clear message
- text is readable at presentation size
- visual hierarchy is consistent
- brand elements are intentional and not overused
- layout margins and alignment are consistent
- image crops do not hide important content
- no placeholder text remains
- language, spelling, and terminology are reviewed

## Rendered Page Review

After rendering page previews, check:

- rendered pages are stored under `exports/<deck-name>/rendered-pages/`
- every slide rendered successfully
- slide numbers and file order are stable
- visual output matches the working deck
- no browser-only layout bugs appear in the rendered output
- exported preview images are suitable for review or QA

## Final Deliverable Review

Before marking the deck `final`, check:

- final PDF or presentation export exists in `decks/<deck-name>/final/`
- final filename is readable and tied to the deck slug
- output opens successfully
- page count matches the intended deck
- image quality is acceptable
- file size is acceptable for the intended handoff channel
- final deliverable is listed in `decks/<deck-name>/README.md`
- version notes are updated

## Package Handoff Review

Before another collaborator picks up the deck, check:

- `briefs/<deck-name>-brief.md` explains the source and intent
- `prompts/<deck-name>/` contains the prompt pack used or intended
- `decks/<deck-name>/README.md` has the current status
- `decks/<deck-name>/notes/` includes important production decisions
- `exports/<deck-name>/README.md` explains reviewed artifacts when useful
- status is one of `exploration`, `working`, or `final`

## Status Update

Use `exploration` when:

- source, outline, prompt approach, or visual style is still being discovered

Use `working` when:

- the deck has a chosen direction and is being assembled or reviewed

Use `final` when:

- final deliverable exists
- review issues are resolved or intentionally accepted
- version notes and package README are updated
