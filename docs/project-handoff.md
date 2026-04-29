# Project Handoff

Last updated: 2026-04-29 (evening session)

This file is the quick-start handoff for humans and AI assistants entering `slidecraft-lab`.

## Current Project Position

`slidecraft-lab` is a controllable AI-assisted presentation production lab.

It is not positioned as a one-click AI presentation generator. The project exists because real presentation work often needs repeatability, source fidelity, revision control, traceable prompts, and human review. The strongest use cases are formal, instructional, administrative, policy, SOP, and school-related decks where beautiful output alone is not enough.

The current product direction is documented in:

- `docs/product-positioning.md`
- `docs/deck-workflow.md`
- `docs/deck-conventions.md`
- `docs/export-review-checklist.md`
- `docs/encoding-guardrails.md`

## Production Modes

The project currently recognizes three deck production modes:

- **Full-Page Generation**: the image model generates the whole slide, including layout and text.
- **Composed Layout**: the AI assistant controls layout and editable text; the image model creates supporting visuals.
- **Hybrid**: full-page generation is used for covers or dividers, while information-heavy slides use composed layout.

The working conclusion so far:

- Full-Page Generation is fast and visually coherent, but risky for Traditional Chinese text, dates, regulations, and small type.
- Composed Layout is slower but more maintainable, and should become the default for formal decks.
- Hybrid is likely the best practical default for official school or administrative material.

## Current Deck Status

Primary active deck:

- `decks/school-property-inventory-115/`

Final outputs currently available:

- `decks/school-property-inventory-115/final/school-property-inventory-115.pdf`
- `decks/school-property-inventory-115/final/school-property-inventory-115-full-page-generation.pdf`
- `decks/school-property-inventory-115/final/school-property-inventory-115-brand-identity.pdf` ← **new, 2026-04-29**

Current deck status:

- The Full-Page Generation version has 10 pages and has been assembled into an image-only PDF.
- Slide 02 was manually corrected with ChatGPT Images local text editing from `114年度盤點計畫` to `113年度盤點計畫`.
- The Full-Page Generation flow is usable for review, but it should still be proofread slide by slide before being treated as final official material.
- A composed-layout version exists as a direction, but it is not yet the polished preferred deliverable.
- **Brand identity version** has been generated: 10 slides with 校徽 and 四精靈 integrated as corner accents. Slide 10 was regenerated once by user after the first pass had mascot placement issues.

Important files for this deck:

- `briefs/school-property-inventory-115-brief.md`
- `prompts/school-property-inventory-115/formal-admin-sequence/` — original prompt pack (no brand identity)
- `prompts/school-property-inventory-115/brand-identity-sequence/` — brand identity prompt pack (new)
- `decks/school-property-inventory-115/notes/slide-outline.md`
- `decks/school-property-inventory-115/notes/slide-copy.md`
- `decks/school-property-inventory-115/notes/production-notes.md`
- `decks/school-property-inventory-115/export-image-only-pdf.js` — now a generic, argument-driven PDF export script
- `exports/school-property-inventory-115/brand-identity-generated/` — brand identity source images (brand-slide-01 to 10)

## ChatGPT Image Generation Findings

Current findings from the ChatGPT Images workflow:

- ChatGPT Images can generate multiple images in the same conversation when the model/mode is switched to Thinking.
- The DOM may show multiple generated thumbnails in one response; each image can have a distinct `/backend-api/estuary/content?id=file_...` URL.
- Multi-image downloads can be automated by collecting generated image URLs from the DOM and deduplicating by `file_...` ID.
- User-uploaded reference images must be excluded from DOM download collection.
- ChatGPT Images supports local partial correction for a single generated image.
- A multi-image generation result currently cannot be locally corrected in the same way.
- Therefore, use single-image generation when the expected workflow includes follow-up local text or layout repairs.
- Use multi-image generation mainly for exploration, candidate comparison, or low-risk visual pages.

Adjacent automation repo:

- `C:\Users\user\projects\browser-automation-workflow`

Known automation status:

- Commit `683de7a Add ChatGPT image batch workflow` was pushed.
- Commit `befff65 Support ChatGPT multi-image DOM downloads` was committed locally and may still need to be pushed, depending on whether that has happened after this handoff.

Automation patches applied on 2026-04-29:

- `lib/chatgpt/session.js`: when `--reuse-chat` is active, `ensureImageMode` is now skipped. This supports regular gpt-4o image-capable conversations, not just the dedicated ChatGPT Images mode.
- `lib/chatgpt/image-batch.js`: same fix applied inside `runImageBatch` — `ensureImageMode` is only called when `--reuse-chat` is false.
- These patches have NOT been committed yet. Commit them before the next session.

Helper scripts added to `slidecraft-lab/scripts/`:

- `scripts/debug-chatgpt-ui.js` — lists all visible images on the current ChatGPT page via CDP; useful for diagnosing generation state
- `scripts/download-latest-image.js` — downloads the most recently generated image from the current ChatGPT conversation to a specified output path; useful for single-slide replacement after manual regeneration

## Brand Identity Direction

Brand identity integration for `school-property-inventory-115` is complete as a first pass.

Visual identity system used:

- 校徽（school crest）: green triquetra outer frame, red circular stamp center with 頂溪 characters
- 光精靈: yellow round body, bat wings, peace symbol on chest, glowing antenna orb
- 海精靈: blue teardrop body, single large eye, holds a green book
- 火精靈: orange-red flame-shaped body, two eyes, holds a magnifying glass
- 樹精靈: orange trunk body, green ball-shaped tree canopy with fruit and birds, blue backpack

Mascot assignment by slide type:

- Cover and closing: all four elves together
- Documentation / explanation slides: 海精靈 (book)
- Inspection / audit slides: 火精靈 (magnifying glass)
- Policy / outreach slides: 光精靈 (wings spread)
- Responsibility / custodian slides: 樹精靈 (backpack)

Brand integration rules enforced in prompts:

- Colors must not be altered
- Limb and wing count must match reference images exactly
- No tails may be added
- Mascot height must not exceed 15% of slide height
- Mascots must not overlap any text, data card, or process arrow
- No white backing plate or border box on mascots
- School crest placed at 8–10% of slide height in corner, not overlapping content

Workflow for brand identity generation:

1. User manually uploads 5 reference images (校徽 + 4 individual elf images) to the ChatGPT conversation
2. Automation runs with `--reuse-chat` so the reference images remain in context
3. Prompts 01–10 are sent sequentially in the same conversation
4. Each prompt contains a self-contained brand identity block — no dependency on conversation memory

Reference assets:

- Individual elf images: provided as user uploads at generation time
- `prompts/school-property-inventory-115/brand-identity-sequence/_context/00-brand-primer.txt` — archived text-only brand description (not used in automation)

Current lesson:

- Brand identity should be described as a controlled visual system, not merely pasted into every slide.
- For formal decks, use the crest and characters as subtle recurring elements unless the slide is a cover, section divider, or child-facing communication.
- Generated slides still need factual and text proofreading even when brand identity is visually successful.
- Mascot placement on the final closing slide (all four elves) is higher risk and may need a manual regeneration pass.

## Known Risks

- Traditional Chinese text inside generated images can drift, omit details, invent words, or render incorrectly.
- Dates and regulation references are high-risk and must be checked manually.
- Full-page generated slides can duplicate text if they are later placed inside a deck template with overlaid text.
- Long same-chat image generation sequences may drift in order, style, or content.
- Separate image-generation chats may produce inconsistent style unless each prompt contains a strong style anchor.
- Windows PowerShell can corrupt or misdisplay CJK text. Treat terminal-rendered Chinese as untrusted. Prefer UTF-8 files, `apply_patch`, browser rendering, PDFs, screenshots, or structured checks.

## Recommended Next Steps

Near-term:

- Proofread `school-property-inventory-115-brand-identity.pdf` slide by slide — check mascot colors, limb counts, crest placement, and Chinese text accuracy.
- Proofread `school-property-inventory-115-full-page-generation.pdf` page by page if not done yet.
- Commit the two automation patches in `browser-automation-workflow` (`session.js` and `image-batch.js`).
- Push the `befff65` multi-image DOM download commit if it has not been pushed yet.

Next product improvement:

- Build the Composed Layout workflow for the same deck.
- Keep official wording in editable deck source.
- Generate lower-text context images for each slide rather than complete text-heavy slide images.
- Compare Full-Page Generation, Brand Identity, and Composed Layout outputs using the same brief.

Longer-term:

- Define a repeatable QA checklist for generated Chinese slide text.
- Define a repeatable brand identity QA checklist (mascot fidelity, crest color, limb count, placement).
- Add a standard handoff section to every deck package.
- Create scripts or review helpers that verify expected image count, PDF page count, and source image ordering.
- Consider making `scripts/download-latest-image.js` accept `--output` as a CLI argument so it can be used for any slide replacement without editing the script.

## Working Rules For Future AI Assistants

- Read `docs/product-positioning.md` before making product-level decisions.
- Read the active deck's `README.md` and `notes/production-notes.md` before editing deck files.
- Do not assume generated image text is correct.
- Do not mix Full-Page Generation images with overlaid deck text unless duplication is intentional.
- Keep generated images, selected images, final exports, notes, and prompts traceable.
- Preserve user edits and do not revert unrelated working tree changes.
- Use `rg` for search.
- On Windows, avoid raw Chinese in PowerShell inline scripts; use UTF-8 files or `apply_patch`.
