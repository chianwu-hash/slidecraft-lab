# Project Structure

## Goal

Keep `slidecraft-lab` focused on presentation delivery work rather than browser automation internals.

## Top-Level Folders

### `briefs/`

Use for:

- raw notes from users
- shortened source summaries
- slide outlines
- policy or project source text prepared for deck generation

### `prompts/`

Use for:

- same-chat Gemini prompt sequences
- cover / inner-page prompt packs
- model-specific prompt variants
- brand and non-brand prompt sets

Prefer one subfolder per deck or experiment.

### `assets/`

Use for:

- logos
- mascots
- school or client brand references
- typography files
- reusable reference images

### `decks/`

Use one folder per final presentation project.

Suggested internal structure:

- `slides.html`
- `export-pdf.js`
- `images/`
- `notes/`
- `final/`

### `exports/`

Use for:

- approved generated image sets
- final PDFs
- presentation preview images

### `experiments/`

Use for:

- prompt A/B tests
- model comparisons
- brand integration trials
- layout studies

Experiments are non-canonical until a result is promoted into `prompts/`, `decks/`, or `exports/`.

### `templates/`

Use for:

- reusable deck package starter documents
- brief, prompt-pack, deck README, and production-note templates
- lightweight scaffolding that supports presentation work without adding automation internals

## Rule of Thumb

If it is reusable browser automation infrastructure, it belongs in `browser-automation-workflow`.

If it is specific to a presentation outcome, it belongs in `slidecraft-lab`.
