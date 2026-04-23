# Deck Workflow

## Positioning

`slidecraft-lab` owns the presentation application layer:

- brief digestion
- outline and prompt-pack design
- brand integration decisions
- deck assembly
- export review and delivery artifacts

`browser-automation-workflow` owns the reusable execution layer:

- browser/session setup
- Gemini prompt-sequence execution
- automation helpers for capture or export

Keep these responsibilities separate. Do not move generic automation scripts into this repo unless they become presentation-specific.

## Standard Flow

1. Create or refine a brief in `briefs/`.
2. Define the deck goal, audience, and visual direction.
3. Build a deck-specific prompt pack in `prompts/<deck-name>/`.
4. Run the prompt pack with tooling from `browser-automation-workflow`.
5. Review and curate outputs in `exports/<deck-name>/`.
6. Assemble the final presentation in `decks/<deck-name>/`.
7. Export review images and the final PDF.

## Recommended Folder Pattern

For each deck:

- `briefs/<deck-name>-brief.md`
  condensed source material and presentation intent
- `prompts/<deck-name>/...`
  prompt packs, variants, and model-specific notes
- `exports/<deck-name>/`
  reviewed generated images and rendered page previews
- `decks/<deck-name>/`
  composed deck source and final deliverables

Suggested contents for `decks/<deck-name>/`:

- `README.md`
- `slides.html`
- `export-pdf.js`
- `images/`
- `notes/`
- `final/`

## Working Rules

- Treat `prompts/` as reusable inputs, not automation code.
- Treat `exports/` as review-stage or approved artifacts outside the deck source.
- Treat `decks/` as the canonical home for the composed presentation.
- Keep brand decisions close to the deck brief, prompt pack, or deck README unless they are reusable across multiple decks.
- If a script or helper would be reused across unrelated decks, it likely belongs in `browser-automation-workflow` instead.

## Sample

`new-taipei-school-lunch` is the current reference sample for this workflow:

- brief: [briefs/new-taipei-school-lunch-brief.md](</c:/Users/user/projects/slidecraft-lab/briefs/new-taipei-school-lunch-brief.md:1>)
- prompt pack: [prompts/new-taipei-school-lunch/nano-banana-sequence/README.md](</c:/Users/user/projects/slidecraft-lab/prompts/new-taipei-school-lunch/nano-banana-sequence/README.md:1>)
- deck: [decks/new-taipei-school-lunch/README.md](</c:/Users/user/projects/slidecraft-lab/decks/new-taipei-school-lunch/README.md:1>)
- exports: [exports/new-taipei-school-lunch/README.md](</c:/Users/user/projects/slidecraft-lab/exports/new-taipei-school-lunch/README.md:1>)
