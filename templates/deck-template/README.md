# Deck Template

Use this template when starting a new presentation project package.

This template does not include browser automation scripts. It only provides application-layer documents for brief, prompts, deck assembly, review notes, and delivery tracking.

## How To Use

1. Choose a stable lowercase deck slug, such as `example-client-update`.
2. Copy `brief.md` to `briefs/<deck-name>-brief.md`.
3. Copy `prompt-pack-readme.md` to `prompts/<deck-name>/<prompt-pack-name>/README.md`.
4. Copy `deck-readme.md` to `decks/<deck-name>/README.md`.
5. Copy `production-notes.md` to `decks/<deck-name>/notes/production-notes.md`.
6. Copy `slide-workflow-qa-checklist.md` to `decks/<deck-name>/notes/slide-workflow-qa-checklist.md` when generated images or overlays need QA.
7. Copy `deck-wide-rules.md` into the prompt pack when using full-page image generation.
8. Copy `experiment-readme.md` to `experiments/<deck-name>/<experiment-name>/README.md` if exploratory work is needed.
9. Create working and output folders as needed.

Recommended package layout:

```text
briefs/<deck-name>-brief.md
prompts/<deck-name>/<prompt-pack-name>/README.md
decks/<deck-name>/README.md
decks/<deck-name>/slides.html
decks/<deck-name>/images/
decks/<deck-name>/notes/production-notes.md
decks/<deck-name>/notes/slide-workflow-qa-checklist.md
decks/<deck-name>/final/
exports/<deck-name>/generated-images/
exports/<deck-name>/rendered-pages/
experiments/<deck-name>/
```

## Status Labels

Use one of these labels in `decks/<deck-name>/README.md`:

- `exploration`
  source, outline, visual direction, or prompt approach is still being discovered
- `working`
  deck package has a chosen direction and is actively being assembled or reviewed
- `final`
  final deliverable exists and the package represents the current approved version

## Boundaries

Keep prompt content, deck decisions, selected assets, and final deliverables in `slidecraft-lab`.

Keep reusable browser/session/Gemini workflow automation in `browser-automation-workflow`.

Presentation-specific post-production helpers, such as applying page-number and logo overlays to generated slide images, may use `tools/overlay-brand-elements.js`.

For naming details, see [docs/naming-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/naming-conventions.md:1>).
