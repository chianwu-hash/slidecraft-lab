# Experiment Conventions

Use experiments for exploratory presentation work that should not yet be treated as canonical deck source.

Experiments help compare visual directions, prompt strategies, model behavior, brand balance, and layout approaches without polluting the final deck package.

## Standard Location

Use this structure:

```text
experiments/<deck-name>/<experiment-name>/
experiments/<deck-name>/<experiment-name>/README.md
```

Examples:

```text
experiments/new-taipei-school-lunch/style-comparison/
experiments/new-taipei-school-lunch/brand-balance-test/
experiments/new-taipei-school-lunch/layout-study/
```

## When To Use Experiments

Use `experiments/` for:

- prompt A/B tests
- model comparisons
- cover image variants
- visual style comparisons
- brand integration trials
- layout studies
- quick prototypes that may be discarded

Do not use `experiments/` for:

- the canonical composed deck
- final deliverables
- selected images already used by the deck
- reusable browser automation tools

## Experiment README

Each experiment should include a short `README.md` with:

- deck package
- experiment goal
- hypothesis or question
- inputs used
- variants tested
- outputs produced
- decision or result
- whether anything should be promoted into the deck package

Suggested structure:

```text
# <Experiment Name>

Deck: <deck-name>
Status: exploration

## Goal

## Variants

## Inputs

## Outputs

## Result

## Promote To Deck?
```

## Variant Naming

Use clear variant names:

```text
variant-a-warm-policy/
variant-b-premium-civic/
variant-c-minimal-infographic/
```

For files:

```text
01-cover-variant-a.png
01-cover-variant-b.png
notes.md
comparison.md
```

Avoid vague names:

- `test1`
- `new`
- `good`
- `final`
- `try-again`

## Relationship To Prompt Packs

If a prompt pack is exploratory and may be discarded, keep it under the experiment:

```text
experiments/<deck-name>/<experiment-name>/prompts/
```

If a prompt pack becomes the chosen direction, promote it to:

```text
prompts/<deck-name>/<prompt-pack-name>/
```

When promoting, update the deck README or production notes with the decision.

## Relationship To Exports

Experiment outputs can stay inside the experiment folder while being evaluated.

When an output becomes part of the deck review path, move or copy it to:

```text
exports/<deck-name>/generated-images/
```

When an image becomes part of the composed deck, copy the selected file to:

```text
decks/<deck-name>/images/
```

## Decision Records

Experiments are most useful when they record decisions.

At minimum, capture:

- what was tested
- what worked
- what failed
- what was selected
- what should not be repeated

If a decision affects the final deck, add a note to:

```text
decks/<deck-name>/notes/
```

## Status Labels

Use lightweight status labels:

- `exploration`
  experiment is still active
- `selected`
  result was promoted into the deck package
- `rejected`
  result should not be used
- `archived`
  experiment is kept for reference only

These labels are separate from deck package status labels.

## Boundary With Automation

Experiments may reference outputs produced by external automation, but should not contain reusable browser/session workflow code.

Keep:

- experiment prompts
- comparison notes
- selected output samples
- decision records

Do not keep:

- generic Gemini session runners
- reusable browser control scripts
- shared download or capture infrastructure

Those belong in `browser-automation-workflow`.
