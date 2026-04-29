# Brand Identity Sequence

This prompt pack belongs to `school-property-inventory-115`.

It is derived from `formal-admin-sequence` and extends every prompt with brand identity integration instructions for the Dingxi Elementary School visual identity system.

For repo-level rules, see [docs/prompt-pack-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/prompt-pack-conventions.md:1>).

## Purpose

Generate a same-chat visual sequence for the 115 school property inventory deck, with the Dingxi Elementary School brand identity (校徽 and 四精靈) integrated into every slide as a restrained corner decoration.

## Execution Flow

This is a fully automated workflow. The only manual step is image upload.

### Step 1 — Manual: Upload Reference Images

Before running the automation, open a ChatGPT Images chat and upload the following 5 reference images without sending any message yet:

1. 校徽 — 頂溪國小 school crest (green triquetra, red circular stamp center)
2. 光精靈 — yellow round body, bat wings, peace symbol, glowing antenna
3. 海精靈 — blue teardrop body, single large eye, holding a green book
4. 火精靈 — orange-red flame-shaped body, two eyes, holding a magnifying glass
5. 樹精靈 — orange trunk body, green tree canopy, blue backpack, birds and fruit

Do not type or send anything manually. Leave the images queued in the input box.

### Step 2 — Automated: Run the Script with `--reuse-chat`

The automation script takes over from here. It sends all prompts in sequence within the same conversation:

```powershell
node scripts/chatgpt-image-batch.js `
  --session-file .browser-sessions/<your-session>.json `
  --prompt-dir "C:\Users\user\projects\slidecraft-lab\prompts\school-property-inventory-115\brand-identity-sequence" `
  --reuse-chat `
  --output-dir "C:\Users\user\projects\slidecraft-lab\exports\school-property-inventory-115\brand-identity-generated"
```

The `--reuse-chat` flag ensures the script does not open a new chat, preserving the uploaded reference images in the conversation context.

### Prompt Execution Order

The script sends prompts in filename sort order:

```text
00-brand-primer.txt   ← sent WITH the uploaded reference images attached (first turn)
01-cover.txt
02-basis-purpose.txt
...
10-records-closing.txt
```

`00-brand-primer.txt` establishes the brand identity rules in text form as the first automated message. The uploaded images are included in that first turn automatically.

## Brand Identity Rules (applied to all slides)

- The school crest is placed in the bottom-right corner at approximately 8–10% of slide height. Colors must not be altered.
- Each slide features one or more 精靈 as a corner accent. The assigned mascot varies by slide type (see table below).
- Mascot height must not exceed 15% of slide height.
- Mascot colors, body shape, limb count, and wing count must exactly match the uploaded reference images. No tails may be added.
- Mascots must be rendered without a white backing plate or border box — they should visually integrate with the background.
- Brand identity elements combined must not exceed 20% of total slide area.
- No brand element may overlap any text, data card, or process arrow.

## Mascot Assignment by Slide

| Slide | 精靈 | Rationale |
|-------|------|-----------|
| 01 封面 | 四隻全部 + 校徽（大） | 封面隆重出場，品牌識別全展示 |
| 02 依據與目的 | 海精靈 | 持書姿態，呼應文件依據與說明 |
| 03 適用範圍與類別 | 樹精靈 | 背包守護感，呼應財產範圍管理 |
| 04 辦理原則 | 光精靈 | 和平符號與光明感，呼應宣導原則 |
| 05 權責分工 | 光精靈 | 展翅歡迎姿，呼應齊心分工 |
| 06 作業時程 | 海精靈 | 持書記錄姿，呼應時程計畫 |
| 07 盤點程序 | 火精靈 | 放大鏡偵查姿，呼應逐項清點 |
| 08 財產檢查程序 | 火精靈 | 放大鏡檢查姿，呼應實地複查 |
| 09 異常處理與報廢 | 樹精靈 | 穩重守護姿，呼應例外處理 |
| 10 成果文件與結語 | 四隻全部（小） | 結尾收束，四精靈齊聚送別 |

## Prompt Order

```text
01-cover.txt
02-basis-purpose.txt
03-scope-types.txt
04-core-principles.txt
05-responsibility-split.txt
06-yearly-timeline.txt
07-inventory-procedure.txt
08-inspection-procedure.txt
09-exception-disposal.txt
10-records-closing.txt
```

## Sequence Type

- same-chat sequence: yes
- independent variants: no
- model or tool assumption: ChatGPT Images (with uploaded reference images per turn)
- execution priority: upload reference images first, then send one prompt file per round
- re-run strategy: if fixes are needed, prefer staying in the same chat and only regenerate the minimum necessary slides

## Output Handling

- review-stage generated images: `exports/school-property-inventory-115/brand-identity-generated/`
- selected deck images: `decks/school-property-inventory-115/images/`

## Notes

- model: ChatGPT Images (GPT-4o with image generation)
- known risk: AI may alter mascot colors or proportions; always compare output against uploaded reference images before promoting
- known risk: Cover slide with all four mascots may become too busy; adjust placement description if result is cluttered
- text-density strategy: same as formal-admin-sequence — prefer shorter card labels and fewer words on-image
