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
- `docs/`
  repo conventions and working agreements

## Suggested Deck Workflow

1. Put source material into `briefs/`.
2. Turn that source into a slide outline.
3. Build a deck-specific prompt pack under `prompts/`.
4. Use `browser-automation-workflow` to run the Gemini image sequence.
5. Save reviewed outputs under `exports/`.
6. Compose the final deck under `decks/<deck-name>/`.

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

This repo starts as a clean presentation workspace scaffold.

It does not yet include:

- a browser automation dependency bridge
- a default deck template
- a publishing workflow

Those can be added after the first few real deck projects settle into a stable pattern.

