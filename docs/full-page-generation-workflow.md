# Full-Page Generation Workflow

Use this guide when the image model generates each complete slide page, including layout, illustration, and most visible text.

This mode is useful for fast visual proposal decks, branded image-only PDFs, workshop concept decks, and cases where the desired output is a polished slide image rather than editable slide objects.

## Core Rule

Separate variable and fixed elements:

- Let the image model generate variable scene content: office context, forms, charts, workflows, tables, atmosphere, and explanatory visuals.
- Add fixed identity elements by code after generation: page numbers, official logos, crests, watermarks, and other marks that must be precise and consistent.

Do not ask the image model to reproduce official marks when exact placement, color, shape, and consistency matter.

## Standard Flow

1. Write the brief.
2. Split the deck into slide-level prompts.
3. Define deck-wide rules before writing individual prompts.
4. Upload only the reference images the model should use for variable content, such as mascots or style references.
5. Generate one slide image at a time.
6. Download raw images.
7. Apply fixed overlays by code.
8. Build a contact sheet.
9. Review the full sequence.
10. Regenerate only the failed slides.
11. Export the final PDF and a smaller share PDF.

## Safe Overlay Zones

When fixed overlays will be added later, prompt for empty safe zones before image generation.

Recommended default for formal school decks:

- top-right: official crest or logo
- bottom-left: page-number badge

Deck-wide prompt rule:

```text
Reserve overlay-safe corners: keep the top-right corner clear for the official crest or logo, and keep the bottom-left corner clear for the page-number badge. Do not place text, icons, metrics, mascots, charts, or important objects in those two corners.
```

Slide-level prompt rule:

```text
Do not create a page number badge. Do not create any crest, logo, seal, stamp, or official emblem. Leave the bottom-left and top-right corners empty for code overlay.
```

## Brand References

Upload reference images only for elements the model is allowed to reinterpret.

Good reference uses:

- mascot pose and color reference
- illustration style reference
- visual tone reference
- campus or office atmosphere reference

Avoid using the image model for:

- exact official crests
- exact school logos
- page numbers
- consistent recurring stamps
- text-heavy official labels that must be exact

If mascots are allowed, write explicit role and anatomy rules. Mascots should support the slide message, not become the message.

## Prompt-Pack Requirements

Every full-page prompt pack should include:

- production mode: full-page generation
- intended model or route, such as ChatGPT web
- deck-wide visual rules
- overlay-safe-zone rules
- brand-reference rules
- text density limits
- sensitive-content exclusions
- QA checklist path
- output naming plan

Individual slide prompts should include:

- exact slide goal
- visible title and main text
- scene or information-design direction
- required labels
- must-avoid content
- overlay-safe-zone reminder

## Review Strategy

Review generated images in two passes:

1. Raw image review:
   - Is the slide message clear?
   - Is text readable enough?
   - Are there hallucinated logos, sensitive data, or wrong labels?
   - Are overlay-safe corners clear?

2. Post-overlay review:
   - Are page numbers consistent?
   - Is the logo/crest consistent?
   - Did overlays cover important content?
   - Does the deck feel coherent as a sequence?

Use a contact sheet for the first full-sequence pass. It is faster than opening every slide individually and makes drift easier to spot.

## Regeneration Rules

Regenerate only the failed slide when possible.

Regenerate when:

- important text is wrong
- fixed overlay areas are occupied
- brand mascots are malformed
- a case slide does not explain the AI/workflow value
- the slide feels off-tone compared with the rest of the deck

Prefer prompt changes over manual image edits when the problem affects message, layout, or brand behavior. Prefer code overlay changes when the problem is only fixed identity placement.

## Tooling

Use `browser-automation-workflow` for ChatGPT web execution and downloads.

Use `slidecraft-lab` for:

- prompt packs
- briefs
- selected images
- notes
- QA checklists
- overlay commands
- final PDF assembly

Shared overlay helper:

```powershell
node tools/overlay-brand-elements.js --image-dir "<raw-image-dir>" --output-dir "<overlay-dir>" --logo "<logo-path>" --total <slide-count> --glob "*.png" --badge-x-ratio 0.016 --badge-y-ratio 0.936 --badge-w-ratio 0.056 --badge-h-ratio 0.038 --logo-height-ratio 0.07 --logo-margin-x-ratio 0.022 --logo-margin-y-ratio 0.018
```

