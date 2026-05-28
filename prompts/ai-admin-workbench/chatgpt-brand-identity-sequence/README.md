# ChatGPT Brand Identity Sequence: AI 行政工作台

This prompt pack generates a branded full-slide image sequence for the `AI 行政工作台` proposal deck using ChatGPT web image generation.

## Purpose

Create a formal Dingxi Elementary School branded version of the AI administrative workbench proposal deck.

This version updates the first pass with:

- school name and brand identity
- consistent page numbering on every slide
- estimated procurement cost of `月費約 NT$4,000`
- five target offices: `教務處`、`學務處`、`總務處`、`輔導處`、`幼兒園`
- a final conclusion slide

## Manual Setup

Before sending the first prompt, manually upload the Dingxi Elementary School logo / crest reference image in the ChatGPT web conversation.

If mascot or school character reference images are also available, upload them in the same conversation. If no mascot reference is uploaded, ChatGPT must not invent new mascots.

Do not open a new chat after uploading the reference images.

## How To Use

1. Open ChatGPT web in the correct Pro account.
2. Start a new image-generation capable chat.
3. Manually upload the Dingxi Elementary School logo / crest reference image.
4. Send `00-brand-primer.txt`.
5. Send `01-cover.txt` through `15-conclusion.txt` one by one.
6. Download each generated image.
7. Save review-stage images under:

```text
exports/ai-admin-workbench/chatgpt-brand-identity-sequence/
```

8. Copy selected final images into:

```text
decks/ai-admin-workbench/images-brand/
```

## Brand Rules

- Use `新北市永和區頂溪國民小學` or `頂溪國小` as the school identity.
- Use the uploaded logo / crest as the only official visual reference.
- Place the logo / crest as a small corner identity mark, not a decorative centerpiece except on the cover and conclusion.
- Do not alter the logo / crest colors or shape.
- Do not invent new logos, English school names, seals, mascots, or school slogans.
- If mascot references are uploaded, use only those references and keep them small.
- If mascot references are not uploaded, use administrative objects and campus motifs instead of characters.

## Numbering Rules

Do not generate page number badges inside the images. Page numbers are added later by code in the bottom-left corner:

```text
01/15, 02/15, 03/15 ... 15/15
```

The code-added badge should be small, readable, and visually consistent across the whole sequence. Keep the bottom-left corner clear for it.

## Sensitive Content Guardrails

- Do not show real personal data.
- Do not show credentials, tokens, calendar IDs, or official document numbers.
- Do not use principal calendar content as a case.
- Do not describe the Pro account as a shared account.
- Use generic screens and symbolic workflow diagrams, not real system screenshots.
