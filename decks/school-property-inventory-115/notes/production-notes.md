# Production Notes

Deck: `school-property-inventory-115`

## Current Status

Status: working

## Decisions

- decision: Start from a brief-first package setup before generating visuals.
  rationale: The source document is policy and process heavy, so structure and accuracy matter before image direction.
- decision: Use a formal administrative presentation tone for the first draft.
  rationale: The source is an internal operational guideline rather than a promotional narrative.
- decision: Keep the deck school-friendly and slightly lively instead of purely rigid.
  rationale: This is still an internal elementary-school presentation, so warmth and approachability can improve readability and acceptance.

## Review Notes

- source file reviewed
- source file re-checked after guideline update
- initial slide outline drafted
- first prompt pack drafted
- first Chinese slide copy drafted
- first text-first HTML deck drafted
- first Gemini image pass reviewed manually from downloaded originals
- targeted second Gemini image pass completed for slides 05, 06, and 08
- selected images promoted into `decks/school-property-inventory-115/images/`
- ChatGPT full-page generation pass completed and promoted into `decks/school-property-inventory-115/images/`
- slide 02 was corrected with ChatGPT Images local text editing from `114年度盤點計畫` to `113年度盤點計畫`
- image-only full-page generation PDF exported to `decks/school-property-inventory-115/final/school-property-inventory-115-full-page-generation.pdf`

## Visual Notes

- what is working: the deck can carry a formal administrative message while still feeling warm and elementary-school-friendly
- what needs revision: long Chinese text is still vulnerable to drift, omission, or invented wording during image generation
- image consistency issues: first-pass and second-pass outputs show visible style differences because separate Gemini chats do not hold visual continuity reliably
- typography or layout issues: text-heavy pages remain higher risk than short-title or low-text pages and require human review after generation
- full-page generation status: technically complete for review as a pure image-only PDF, but all on-slide text remains pixel text and requires human proofreading before formal use

## Workflow Learnings

- Small amounts of text usually survive Gemini image generation with fewer issues, while text-heavy slides are much more likely to drift.
- Codex self-check can catch obvious structure and wording issues, but final verification still depends on careful human review of the downloaded originals.
- **Style Continuity Strategy**: Different Gemini chats produce different visual styles, BUT long continuous same-chat sequences degrade quality over time (around slide 7-8). The most stable approach is creating a self-contained "Style Anchor" in every prompt and generating each slide in an independent, fresh chat.
- **Automation UI Reliability**: The Gemini chat UI's send button can sometimes be unresponsive or change its DOM selectors, causing the script to paste the prompt but fail to send. This currently requires occasional manual intervention.
- **ChatGPT Web Image Rhythm**: Treat ChatGPT web image generation as one image per turn. For deck sequences, send one prompt file per round instead of combining all slide prompts into one large prompt.
- **Full-Page Generation Boundary**: When generated images already contain the complete slide text and layout, export them directly as an image-only PDF. Do not place them into a text-overlay deck template, or users will see duplicated text.
- **Local Text Correction**: ChatGPT Images can be useful for small local text repairs after generation. Archive corrected images separately before promoting them into `decks/<deck-name>/images/`.

## Current Adjustment Direction

- Full-page generation workflow is ready for user review as a distinct output mode.
- Next improvement path is the composed-layout workflow: generate lower-text context visuals and keep final official wording in editable deck source.

## Open Questions

- Should this deck be aimed at all staff or specifically at property custodians and office leads?
- Should text-heavy slides be redesigned into shorter headline-plus-card layouts before any future regeneration pass?
- Should the full-page generation PDF be treated as a fast review artifact only, or as a deliverable format after human proofreading?
- Which slides should be regenerated or locally edited if the user wants a polished final full-page-generation version?

## Handoff Notes

Next recommended step:

- review `school-property-inventory-115-full-page-generation.pdf` slide by slide for Chinese text accuracy
- decide whether to proceed to composed-layout mode for a more maintainable formal version
