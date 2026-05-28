# slidecraft-lab

An experimental workspace for crafting AI-assisted presentations with repeatable workflows, high adjustment freedom, reviewable production layers, and brand-aware design.

## Purpose

`slidecraft-lab` is the application-layer repo for presentation work. It is not a one-click AI deck generator; it is a controllable presentation production lab.

The project exists to produce decks that better fit real user needs by keeping source material, slide copy, image prompts, generated images, layout source, exports, and production notes separated enough to review and rerun.

It focuses on turning real source material into presentation outputs such as:

- visual-first presentation concepts
- branded slide image sets
- prompt packs for same-chat image generation
- composed HTML/PDF decks
- presentation experiments across Gemini, Canva, and related workflows

This repo is intentionally separate from the browser automation foundation.

In this repo, a deck means a complete presentation project package, not only the final exported file.

For the fuller product position, see [docs/product-positioning.md](</c:/Users/user/projects/slidecraft-lab/docs/product-positioning.md:1>).

## Product Position

`slidecraft-lab` favors accuracy, controllability, revision, and process learning over one-click speed.

Market AI presentation products are useful for fast generation. This repo is useful when a deck needs:

- repeatable workflows
- high freedom to adjust text, image, and layout separately
- traceable prompts and production decisions
- human-reviewable outputs
- formal or domain-specific accuracy
- reusable lessons across future decks

Each deck should declare its production mode before image prompts are written:

- full-page generation: the image model creates the whole slide page, including text
- composed layout: the assistant controls final text and layout, while the image model creates supporting visuals
- hybrid: full-page generation for covers or dividers, composed layout for information-heavy pages

For full-page decks with fixed identity, prefer this split: the image model generates variable slide scenes, while code adds exact recurring elements such as page numbers, official crests, and logos. See [docs/full-page-generation-workflow.md](</c:/Users/user/projects/slidecraft-lab/docs/full-page-generation-workflow.md:1>).

Comparative output is an optional experiment strategy, not a fourth production mode.

## Relationship to `browser-automation-workflow`

Use `browser-automation-workflow` for:

- browser session setup
- Gemini session control
- same-chat image prompt sequencing
- Drive picker integration
- result export scaffolding

Use `slidecraft-lab` for:

- presentation briefs and source notes
- deck-specific prompt sets
- brand-specific visual direction
- generated image curation
- HTML/PDF slide assembly
- experiment tracking by deck or client/topic

In short:

- `browser-automation-workflow` = reusable foundation
- `slidecraft-lab` = presentation-making workspace

## Recommended Structure

- `briefs/`
  source notes, condensed input docs, outline drafts
- `prompts/`
  deck-specific prompt packs and prompt variants
- `assets/`
  brand assets, logos, mascots, reference images, fonts
- `decks/`
  one folder per presentation project
- `exports/`
  final deck outputs and reviewed generated images
- `experiments/`
  side-by-side tests, model comparisons, prompt studies
- `templates/`
  reusable deck package starters and document templates
- `docs/`
  repo conventions and working agreements

## Suggested Deck Workflow

1. Put source material into `briefs/`.
2. Turn that source into a slide outline.
3. Build a deck-specific prompt pack under `prompts/`.
4. Use `browser-automation-workflow` to run the Gemini image sequence.
5. Save reviewed outputs under `exports/`.
6. Compose the final deck under `decks/<deck-name>/`.
7. For full-page image decks, apply fixed overlays, build a contact sheet, and regenerate only failed slides.

See also:

- [docs/project-structure.md](</c:/Users/user/projects/slidecraft-lab/docs/project-structure.md:1>)
- [docs/deck-workflow.md](</c:/Users/user/projects/slidecraft-lab/docs/deck-workflow.md:1>)
- [docs/deck-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/deck-conventions.md:1>)
- [docs/brand-integration.md](</c:/Users/user/projects/slidecraft-lab/docs/brand-integration.md:1>)
- [docs/full-page-generation-workflow.md](</c:/Users/user/projects/slidecraft-lab/docs/full-page-generation-workflow.md:1>)
- [docs/export-review-checklist.md](</c:/Users/user/projects/slidecraft-lab/docs/export-review-checklist.md:1>)
- [docs/naming-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/naming-conventions.md:1>)
- [docs/encoding-guardrails.md](</c:/Users/user/projects/slidecraft-lab/docs/encoding-guardrails.md:1>)
- [docs/sample-deck-walkthrough.md](</c:/Users/user/projects/slidecraft-lab/docs/sample-deck-walkthrough.md:1>)
- [docs/prompt-pack-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/prompt-pack-conventions.md:1>)
- [docs/experiment-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/experiment-conventions.md:1>)
- [docs/deck-publishing-notes.md](</c:/Users/user/projects/slidecraft-lab/docs/deck-publishing-notes.md:1>)

## First Use

Create a deck folder such as:

```text
decks/new-taipei-school-lunch/
```

Then keep related files together:

- source brief
- selected prompts
- generated images
- final slide layout
- exported PDF

## Current Status

This repo is now organized as a presentation product workspace with one complete reference deck.

It currently includes:

- one complete reference deck: `new-taipei-school-lunch`
- brief, prompt pack, generated image set, composed HTML deck, export script, and final PDF
- starter documents for new deck packages under `templates/deck-template/`

It does not yet aim to include:

- a browser automation dependency bridge
- an automated publishing pipeline

Those can be added after the first few real deck projects settle into a stable pattern.
