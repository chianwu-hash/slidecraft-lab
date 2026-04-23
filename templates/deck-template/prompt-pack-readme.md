# <Prompt Pack Name>

This prompt pack belongs to `<deck-name>`.

It is a deck-specific prompt source, not an automation script.

For repo-level rules, see [docs/prompt-pack-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/prompt-pack-conventions.md:1>).

## Purpose

Describe what this prompt pack generates.

Examples:

- same-chat visual sequence
- cover image variants
- character consistency study
- branded background set

## Visual Continuity Rules

- lead character:
- color palette:
- environment:
- illustration or photo style:
- typography treatment:
- recurring objects:

## Brand Rules

- brand assets referenced:
- logo usage:
- mascot or character usage:
- color constraints:
- tone constraints:
- must-avoid visual elements:

## Prompt Order

Use two-digit prefixes for prompt files:

```text
01-cover.txt
02-context.txt
03-key-point.txt
```

## Sequence Type

- same-chat sequence:
- independent variants:
- model or tool assumption:

## Execution Boundary

Run this prompt pack with tooling from `browser-automation-workflow`.

Keep only the prompt content, deck-specific sequencing notes, and selected output references in `slidecraft-lab`.

## Output Handling

- review-stage generated images: `exports/<deck-name>/generated-images/`
- selected deck images: `decks/<deck-name>/images/`
- rendered page previews: `exports/<deck-name>/rendered-pages/`

## Notes

- model:
- date generated:
- known issues:
- selection rationale:
