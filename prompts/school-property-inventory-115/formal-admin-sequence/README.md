# Formal Admin Sequence

This prompt pack belongs to `school-property-inventory-115`.

It is a deck-specific prompt source, not an automation script.

For repo-level rules, see [docs/prompt-pack-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/prompt-pack-conventions.md:1>).

## Purpose

Generate a same-chat visual sequence for an internal administrative presentation deck about the 115 school property inventory guidelines.

Core context to keep fixed across the whole sequence:

- school name: `頂溪國小`
- deck type: internal informational presentation, not an event notice and not a briefing-session poster
- forbidden invented details: other school names, English school names, meeting titles, meeting time, meeting location, host, speaker, registration info, extra event metadata

Examples:

- same-chat visual sequence
- process and timeline slides
- responsibility split slides
- policy and records summary slides

## Visual Continuity Rules

- lead character: use friendly school staff, office personnel, and custodians as recurring human context; child-friendly school atmosphere is welcome, but do not let it overpower the administrative message
- color palette: calm civic greens, soft blue-gray, warm cream paper tones, and a small amount of cheerful school-friendly accent color
- environment: school office, records room, classroom inventory setting, administrative meeting context, tidy campus-administration atmosphere
- illustration or photo style: polished presentation illustration with infographic-friendly composition and a gentle, lively elementary-school-friendly touch
- typography treatment: large clear Traditional Chinese title area and clean data-card structure
- recurring objects: property labels, clipboards, checklists, files, office folders, timeline bars, simple icons, warm campus stationery details

## Brand Rules

- brand assets referenced: none required for the first draft
- logo usage: optional and restrained
- mascot or character usage: optional only as a very light supportive visual motif; not as the main focus
- color constraints: avoid neon, over-saturated cartoon palettes, and flashy marketing color contrast
- tone constraints: formal, practical, orderly, trustworthy, warm, approachable
- must-avoid visual elements: ad-like marketing scenes, overly childish mascot-first layouts, chaotic collage layouts

## Prompt Order

Use two-digit prefixes for prompt files:

```text
01-cover.txt
02-basis-purpose.txt
03-scope-types.txt
```

## Sequence Type

- same-chat sequence: yes
- independent variants: no
- model or tool assumption: same-chat image generation workflow executed from `browser-automation-workflow`
- ChatGPT web execution: send one numbered prompt file per round with `--prompt-dir`; do not combine all slide prompts into one large prompt
- execution priority: always generate the full first pass in one continuous chat before considering any re-runs
- re-run strategy: if fixes are needed, prefer staying in the same chat and only regenerate the minimum necessary slides

## Execution Boundary

Run this prompt pack with tooling from `browser-automation-workflow`.

Keep only the prompt content, deck-specific sequencing notes, and selected output references in `slidecraft-lab`.

## Output Handling

- review-stage generated images: `exports/school-property-inventory-115/generated-images/`
- selected deck images: `decks/school-property-inventory-115/images/`
- rendered page previews: `exports/school-property-inventory-115/rendered-pages/`

## Notes

- model: not fixed yet
- date generated: pending
- known issues: policy/process slides must stay readable and not become overly decorative even when the tone becomes friendlier
- text-density strategy: for text-heavy pages, prefer shorter card labels, shorter step wording, and fewer words on-image
- generation guardrail: always anchor the deck to `頂溪國小` and avoid invented meeting/event details
- selection rationale: prioritize readability, process clarity, internal administrative tone, and a warm elementary-school-friendly atmosphere
