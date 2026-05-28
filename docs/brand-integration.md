# Brand Integration

Use this guide when a deck needs to reflect a school, client, product, campaign, or visual identity.

Brand integration in `slidecraft-lab` is an application-layer concern. It describes how brand material shapes the brief, prompt pack, visual direction, deck assembly, and final review. It does not define browser automation behavior.

## Goals

Good brand integration should make a deck feel intentional and recognizable without turning every slide into a logo placement exercise.

Aim for:

- clear visual identity
- consistent tone and visual language
- appropriate use of logos, mascots, colors, and type references
- prompt language that can preserve brand direction across generated images
- final deck assembly that respects the source brand without overloading slides

Avoid:

- using logos as decoration on every slide
- copying brand material into prompts without explaining the intended visual role
- mixing too many unrelated style references
- treating generated images as final before reviewing brand fit
- asking the image model to reproduce official marks that must remain exact across the deck

## Brand Inputs

Collect brand inputs before writing the main prompt pack.

Recommended inputs:

- logo files
- mascot or character references
- color palette
- typography references
- sample slides, posters, websites, or social posts
- tone words, such as warm, institutional, playful, premium, academic, civic, or energetic
- must-use and must-avoid rules

Store reusable brand assets in:

```text
assets/<brand-or-client>/
```

Store one-off deck-specific references near the deck package if they are not expected to be reused:

```text
decks/<deck-name>/images/
```

## Brief-Level Brand Decisions

The brief should explain how the brand affects the presentation outcome.

Add brand context to `briefs/<deck-name>-brief.md`:

- brand owner
- audience expectation
- visual tone
- colors or motifs to preserve
- mascot or character requirements
- restrictions on logo use
- any visual references that should guide the deck

The brief should answer:

- What should feel branded?
- What should remain neutral or policy-focused?
- Should the deck look like an official artifact, a teaching aid, a pitch deck, or a public-facing story?

## Prompt-Level Brand Decisions

The prompt pack should translate brand direction into repeatable visual rules.

Include:

- palette language
- character consistency rules
- background and environment motifs
- illustration or photo style
- typography treatment if image text is allowed
- logo usage rules if logos should appear in generated images
- negative constraints for off-brand elements

For same-chat image sequences, keep brand rules stable across all prompts. Change slide content, scene, and emphasis, but avoid rewriting the entire style direction for every slide.

## Fixed Identity Overlays

When a brand element must be exact, consistent, and audit-friendly, add it after image generation instead of asking the image model to draw it.

Use code overlays for:

- official school crests
- official logos
- page-number badges
- watermarks
- recurring seals, stamps, or labels that must be identical on every slide

Use the image model for variable branded context:

- branded atmosphere
- color and tone
- mascot references
- scene motifs
- office, campus, or product context

For full-page generation, prompt for safe empty corners before generating the image. The current recommended school-deck default is:

- top-right: official crest or logo
- bottom-left: page number

Deck-wide prompt rule:

```text
Reserve overlay-safe corners: keep the top-right corner clear for the official crest or logo, and keep the bottom-left corner clear for the page-number badge. Do not place text, icons, metrics, mascots, charts, or important objects in those two corners.
```

This prevents the post-production overlay from covering important slide content.

## Deck Assembly Decisions

The composed deck should apply brand identity deliberately.

Use brand material in:

- cover treatment
- recurring frame or motif
- section dividers
- accent colors
- caption or callout styling
- closing slide

Keep slide readability first. If a generated image is beautiful but fights the message or brand, treat it as an experiment, not a final asset.

## Output Review

Review generated images and final pages separately.

Generated image review:

- Does the image follow the requested palette and tone?
- Is the character or mascot consistent?
- Are there unwanted logos, text artifacts, or off-brand details?
- Is the image suitable for the intended audience?

Final deck review:

- Does the deck feel coherent as a full presentation?
- Are brand elements consistent but not overwhelming?
- Are fixed overlays consistent and clear of important content?
- Are text, layout, and image hierarchy readable?
- Are final deliverables placed in `decks/<deck-name>/final/`?

## Where Things Belong

Use these locations:

- reusable brand assets: `assets/<brand-or-client>/`
- brand notes in source context: `briefs/<deck-name>-brief.md`
- prompt-level brand rules: `prompts/<deck-name>/<prompt-pack-name>/README.md`
- selected images used in the deck: `decks/<deck-name>/images/`
- brand review notes: `decks/<deck-name>/notes/`
- reviewed generated outputs: `exports/<deck-name>/generated-images/`
- final deliverables: `decks/<deck-name>/final/`

## Starter Checklist

Before generating images:

- brand inputs collected
- brand role clarified in the brief
- visual continuity rules written in the prompt pack
- logo and mascot usage rules decided
- must-avoid elements listed

Before final export:

- selected images reviewed for brand fit
- fixed overlay positions reviewed for consistency
- slide assembly reviewed for consistency
- final PDF or presentation export placed in `decks/<deck-name>/final/`
- version notes updated in `decks/<deck-name>/README.md` or `decks/<deck-name>/notes/`
