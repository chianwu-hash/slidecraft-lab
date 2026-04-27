# Product Positioning

`slidecraft-lab` is a repeatable, adjustable, and reviewable AI-assisted presentation production lab.

It is not meant to compete with one-click AI presentation products on speed alone. Its purpose is to help produce presentations that better match a user's actual source material, audience, constraints, and review needs.

## Core Position

`slidecraft-lab` exists to turn real source material into controlled presentation packages.

The project values:

- repeatable workflows
- high adjustment freedom
- traceable production decisions
- reviewable text, image, layout, and export artifacts
- reusable prompt packs and deck conventions
- user-specific fit over generic one-click output

Market AI presentation tools are useful when the priority is quick generation. `slidecraft-lab` is useful when the priority is accuracy, controllability, revision, and process learning.

## What Makes It Different

Most AI presentation tools hide the production process behind a single interface. That is convenient, but it can make formal or domain-specific decks hard to audit.

`slidecraft-lab` keeps the work separated into layers:

- source brief and constraints
- slide outline
- slide copy
- image prompt pack
- generated image candidates
- selected assets
- composed deck source
- rendered previews
- final export
- production notes and QA decisions

This separation makes it easier to find where a problem happened, rerun only the needed part, and preserve lessons for the next deck.

## Why It Exists

The project exists because many real presentation tasks are not only design tasks.

School administration, teaching material, public policy, internal SOP, inventory management, and other operational decks often need:

- accurate Traditional Chinese text
- correct dates, role names, regulations, and process wording
- controlled tone for a specific audience
- maintainable files that can be corrected later
- a clear record of image-generation prompts and selected outputs
- human review before final delivery

For these cases, a fast all-in-one AI result may look polished but still be hard to trust or revise. `slidecraft-lab` gives the user and AI assistant a more inspectable production path.

## Presentation Production Modes

Each deck should declare which production mode it uses before image prompts are written.

### 1. Full-Page Generation

The image model generates the whole slide page, including visual layout and text.

Use this for:

- cover pages
- posters
- mood or concept explorations
- visual-first pages with low text-risk
- fast style exploration

Tradeoffs:

- fastest path to a finished-looking page
- strong image-text fusion
- difficult to correct text
- higher risk for Chinese text errors, invented details, or unreadable small type

### 2. Composed Layout

The assistant plans the page layout and controls the final text. The image model generates supporting context visuals, illustrations, backgrounds, or image areas.

Use this for:

- administrative briefings
- instructional decks
- policy, guideline, SOP, and timeline pages
- pages with dates, regulations, procedures, or role responsibilities
- final decks that need later editing

Tradeoffs:

- slower than full-page generation
- more controllable and maintainable
- avoids duplicated text between image and deck copy
- keeps official wording in editable deck source instead of inside AI-generated pixels

### 3. Hybrid

Use full-page generation for covers or section dividers, and composed layout for information-heavy pages.

This is often the best default for formal decks: let generated imagery carry mood and identity, while keeping important text in the composed deck layer.

## Workflow Principle

Before creating image prompts, decide whether generated images are:

- final slide pages, or
- visual assets used inside a composed page.

This decision controls:

- whether image prompts may include text
- whether the deck source should overlay text
- how QA checks should be run
- whether later corrections require regenerating images

For formal decks, default to composed layout unless there is a clear reason to make the generated image the final page.

## Optional Comparison Strategy

Comparative output is not a separate production mode. It is an experiment strategy.

When exploring a new deck type, model, brand style, or workflow rule, produce more than one version of the same brief and compare:

- full-page generation versus composed layout
- composed layout versus hybrid
- different image models or prompt packs
- different layout directions

Use this when the team needs evidence before choosing a default workflow.

## Quality Bar

A finished `slidecraft-lab` deck should be judged by more than visual appeal.

It should be:

- useful for the intended audience
- faithful to the source material
- readable at presentation size
- free of duplicated image text and deck text unless intentional
- traceable back to prompts and production notes
- easy to revise without restarting the whole deck
- clear about which parts were generated, selected, composed, and reviewed

## One-Sentence Summary

`slidecraft-lab` is not a one-click AI deck generator; it is a controllable AI presentation production system for creating, reviewing, revising, and learning from presentation workflows.
