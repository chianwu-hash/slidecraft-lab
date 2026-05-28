# Production Notes

Deck: `ai-admin-workbench`

## Current Status

Status: branded 17-page rev3 PDF exported; deck workflow documented for sharing

## Decisions

- decision: Use full-page generation with ChatGPT web image generation.
  rationale: The user wants the ChatGPT web route and complete slide images, matching the current Pro-account proposal story.
- decision: Create a separate branded prompt pack instead of overwriting the neutral first pass.
  rationale: The neutral deck is already exported; the formal proposal now needs Dingxi Elementary School brand identity, consistent slide numbering, revised procurement cost, office expansion changes, and a final conclusion slide.
- decision: Keep text short and large on every generated slide.
  rationale: Full-page generation is visually fast but Traditional Chinese text can drift if prompts ask for dense content.
- decision: Do not use principal calendar content as a promoted case.
  rationale: Principal schedules are sensitive; the Google Calendar case should focus on venue rental calendars.
- decision: Position the Pro account as a workbench-building account operated by a designated staff member.
  rationale: This keeps the first-stage procurement simple and avoids presenting it as a shared account.

## Workflow

1. Open ChatGPT web in an image-capable chat.
2. Paste `00-brand-primer.txt` or the `00` section from `copy-sequence.md`.
3. Paste slide prompts `01` through `15` one by one.
4. Download each image and name files with two-digit prefixes.
5. Save review-stage images under `exports/ai-admin-workbench/chatgpt-brand-identity-sequence/`.
6. Promote selected reviewed images into `decks/ai-admin-workbench/images-brand/`.
7. Export selected images into an image-only PDF.

## Review Notes

- completed: generated first ChatGPT web image pass for slides 01-08
- completed: downloaded slides 01-08 into `exports/ai-admin-workbench/chatgpt-image-sequence/`
- completed: promoted slides 01-08 into `decks/ai-admin-workbench/images/`
- completed: exported partial review PDF `decks/ai-admin-workbench/final/ai-admin-workbench-chatgpt-images-partial-01-08.pdf`
- blocked: slide 09 did not generate because the logged-in ChatGPT session reached the free image generation limit; page says generation can resume at 21:40
- completed: switched to the intended Pro account and sent the style primer again in a new ChatGPT conversation
- completed: generated and downloaded slides 09-14
- completed: promoted all 14 selected images into `decks/ai-admin-workbench/images/`
- completed: exported complete image-only PDF `decks/ai-admin-workbench/final/ai-admin-workbench-chatgpt-images.pdf`
- reviewed: spot-checked slides 02, 03, 05, 07, 12, 13, and 14 for broad fit, key wording, and sensitive-calendar concerns
- completed: drafted branded prompt pack `prompts/ai-admin-workbench/chatgpt-brand-identity-sequence/`
- completed: updated branded deck content to 15 slides with `01/15` through `15/15` numbering
- completed: changed procurement estimate to `月費約 NT$4,000` for school procurement through reseller, taxes, and handling costs
- completed: revised expansion slide to use the five offices `教務處`、`學務處`、`總務處`、`輔導處`、`幼兒園`
- completed: added a dedicated conclusion slide
- completed: manually uploaded Dingxi Elementary School logo / crest reference image before running the branded sequence
- completed: generated branded 15-slide sequence in one ChatGPT Pro conversation
- completed: recovered slide 06 directly from the ChatGPT image file id after the browser automation did not mark it as downloaded
- completed: regenerated slide 01 after brand QA because the first cover used the logo / mascots too prominently and increased drift risk
- completed: promoted selected branded images into `decks/ai-admin-workbench/images-brand/`
- completed: exported branded image-only PDF `decks/ai-admin-workbench/final/ai-admin-workbench-brand-identity.pdf`
- reviewed: contact-sheet pass confirmed consistent `01/15` through `15/15` numbering, `NT$4,000` procurement slide, five-office expansion slide, and conclusion slide
- pending: full human review of fine Chinese text legibility slide by slide
- completed: revised the formal deck to 17 pages with two appendix slides and a conclusion slide
- completed: moved the page number overlay to the bottom-left and kept the school crest at the top-right
- completed: regenerated the cashier automation slide after removing incorrect venue-rental / VRMS wording
- completed: exported `decks/ai-admin-workbench/final/ai-admin-workbench-dingxi-brand-final-17-bottom-left-rev3.pdf`
- completed: exported `decks/ai-admin-workbench/final/ai-admin-workbench-dingxi-brand-final-17-bottom-left-rev3-screen.pdf`
- completed: documented the reusable slide-production workflow in `notes/workflow-retrospective-and-diffusion-plan.md`
- completed: created `notes/slide-workflow-qa-checklist.md` for future QA
- completed: created `notes/sharing-workshop-outline.md` for internal sharing and diffusion

## Visual Notes

- desired tone: warm, credible, school administrative, practical
- avoid: enterprise tech ad, sci-fi UI, dense text, real sensitive records
- recurring motifs: folders, forms, checklists, venue rental calendar, VS Code/Codex side panel, dry-run safety flow
- continuity note: the branded deck was generated in one intended Pro-account conversation after uploading the Dingxi brand reference image; slide 01 was regenerated in the same conversation after QA.

## Open Questions

- Should the final proposal PDF include an appendix with exact cost and account-governance wording outside the generated image deck?
