# slidecraft-lab

An experimental workspace for crafting AI-generated presentations with strong visual identity, repeatable workflows, and brand-aware design.

## Purpose

`slidecraft-lab` is the application-layer repo for presentation work.

It focuses on turning real source material into presentation outputs such as:

- visual-first presentation concepts
- branded slide image sets
- prompt packs for same-chat image generation
- composed HTML/PDF decks
- presentation experiments across Gemini, Canva, and related workflows

This repo is intentionally separate from the browser automation foundation.

In this repo, a deck means a complete presentation project package, not only the final exported file.

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

See also:

- [docs/project-structure.md](</c:/Users/user/projects/slidecraft-lab/docs/project-structure.md:1>)
- [docs/deck-workflow.md](</c:/Users/user/projects/slidecraft-lab/docs/deck-workflow.md:1>)
- [docs/deck-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/deck-conventions.md:1>)
- [docs/brand-integration.md](</c:/Users/user/projects/slidecraft-lab/docs/brand-integration.md:1>)
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
