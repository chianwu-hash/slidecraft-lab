# 頂溪國小品牌識別簡報 SOP

本 SOP 記錄本次 `AI 行政工作台` 簡報測試後決定的品牌識別生圖流程。目標是讓 ChatGPT 網頁負責情境化畫面生成，讓校徽、頁碼等必須精準一致的元素交由本機程式後製，避免全頁生成時出現校徽漂移、頁碼大小不一、品牌元素變形等問題。

## 核心結論

- 正式簡報採 `ChatGPT 網頁 + CDP` 生圖，不使用 Codex 內建 ImageGen。
- 每張投影片仍採逐頁單張生成，不把正式簡報一次多圖生成。
- `Thinking` 模式比 `Instant` 更適合多步驟圖像指令與品牌參考。
- 校徽不交給 ChatGPT 生成，固定由程式後製疊加。
- 四精靈可上傳 reference sheet 給 ChatGPT 參考，但每頁可選擇 0-4 隻小型精靈；若會干擾內容，應直接省略。
- 頁碼、校徽一律後製，確保位置、尺寸一致。
- 品牌識別永遠是輔助，不可反客為主；簡報主體必須是行政案例、流程、資料或提案理由。

## 品牌素材

原始素材資料夾：

`G:\我的雲端硬碟\111頂溪\01彩虹精靈`

校徽：

`G:\我的雲端硬碟\111頂溪\01彩虹精靈\01頂溪.png`

四精靈單圖：

- `G:\我的雲端硬碟\111頂溪\01彩虹精靈\榮譽制度版\01光精靈.png`
- `G:\我的雲端硬碟\111頂溪\01彩虹精靈\榮譽制度版\02火精靈.png`
- `G:\我的雲端硬碟\111頂溪\01彩虹精靈\榮譽制度版\03海精靈.png`
- `G:\我的雲端硬碟\111頂溪\01彩虹精靈\榮譽制度版\04樹精靈.png`

已產生的四精靈參考圖：

`D:\projects\slidecraft-lab\decks\ai-admin-workbench\brand-assets\four-mascots-reference.png`

## 前置條件

啟動並登入 ChatGPT 的 CDP Chrome：

```powershell
cd C:\Users\user\projects\cbs-workflows
npm run browser:init -- -- --app chatgpt --browser chrome --port 9222 --yes --no-wait
```

確認 CDP 可連：

```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 9222
```

ChatGPT composer 需切到 `Thinking`。

## 建立四精靈 Reference Sheet

Reference sheet 必須只包含四精靈，不包含校徽。原因是如果上傳「校徽與四精靈」組合圖，ChatGPT 容易把校徽畫進文件、資料夾或內容區，造成多個假校徽。

建議輸出位置：

`D:\projects\slidecraft-lab\decks\ai-admin-workbench\brand-assets\four-mascots-reference.png`

Reference sheet 文字規則：

- 只參考角色造型與顏色
- 不要生成校徽、logo 或學校印章
- 保持顏色、手腳數量、翅膀數量與基本輪廓
- 可依情境做小幅動作，但只在不影響文字、流程、表格與主訊息時加入

## 上傳品牌參考圖防呆

使用自動化腳本上傳四精靈 reference sheet：

```powershell
cd D:\projects\browser-automation-workflow
npm run chatgpt:upload-reference -- --cdp-url http://127.0.0.1:9222 --file "D:\projects\slidecraft-lab\decks\ai-admin-workbench\brand-assets\four-mascots-reference.png"
```

防呆判斷：

- 若 ChatGPT composer 內偵測到圖片附件預覽，才可繼續生圖。
- 若沒有偵測到附件預覽，必須停止，不可送出生圖 prompt。
- 此時需提醒使用者手動上傳 reference sheet，或重新啟動 CDP / 重新登入。

本次測試成功訊號：

- `ok: true`
- `imagePreviewCount: 1`
- `composerTextTail` 顯示 `Thinking`

## Prompt 原則

整份簡報的通用規則必須集中管理，不應只寫在某一張投影片 prompt 裡。凡是「品牌不反客為主、案例頁標題、AI 工作台價值、術語白話化、縮寫解釋、API 要畫進流程」這類規則，皆屬於 deck-wide rules，應由 `chatgpt:image-batch` 自動注入，手動貼上版則放在 `00 Style Primer`。

### Deck-Wide Rules

```text
- The deck is a formal elementary-school administrative proposal. Keep it calm, readable, practical, and credible.
- The main subject of each slide must be the administrative logic: case evidence, workflow, data, safety, procurement, or rollout plan.
- Brand identity must support the message only. It must never become the composition, theme, or visual focus.
- Reserve overlay-safe corners: keep the top-right corner clear for the official school crest, and keep the bottom-left corner clear for the page-number badge. Do not place text, icons, metrics, mascots, or important objects in those two corners.
- Mascots are optional. Use 0 to 4 tiny mascots only when they do not interfere with text, data, workflow, or the slide message. It is acceptable to omit mascots on dense slides.
- Use restrained school-office colors, clear spacing, and information-design layout. Avoid cute poster styling, sticker-heavy compositions, giant arrows, comic excitement marks, and excessive saturation.
- Use audience-friendly Traditional Chinese. Avoid unexplained engineering terms.
- Use 模擬執行. If English is needed, write it once as 模擬執行（dry-run） and explain: 先預覽結果，不直接改原始資料.
- Explain acronyms on first use. For example: 場租管理系統（VRMS） and Venue Rental Management System.
- Every implemented application or workflow example slide must clearly mark it as a case. The visible title should start with 案例： or 場租案例一／二／三：.
- Every case slide must make the AI-workbench value explicit. Show how AI reads, organizes, checks, drafts, calls APIs, prepares outputs, or supports human confirmation.
- If a case uses an API, show the API in the workflow rather than only showing the final interface.
```

每張 prompt 開頭仍建議固定加入：

```text
Generate the image now. Reply with image only; do not answer with explanatory text.

Create exactly one 16:9 horizontal presentation slide image.

Use the uploaded image only as a four-mascot character reference. It does not contain the school crest. Do not generate any school crest, logo, seal, stamp, or school emblem anywhere in the slide.
```

精靈約束：

```text
Strict Dingxi mascot integrity rules. Treat these as brand QA requirements; if any rule is violated, the image is unusable.
- Mascots are optional. Use 0 to 4 tiny mascots only when they do not interfere with text, data, workflow, or the slide message. It is acceptable to omit mascots on dense slides.
- Mascots are small supporting accents only. Keep each mascot under about 10% of slide height, and keep all mascots together under about 15% of total slide area.
- Do not place mascots in the center as the main composition. Prefer edges, corners, desk foreground, or small helper positions.
- Avoid cute poster energy, oversized mascot faces, sticker-heavy layouts, comic-book excitement marks, and excessive saturation.
- Use the uploaded reference only for the four mascot characters. Keep their original colors and silhouettes.
- Do not invent new mascot species, substitute animals, or merge mascots together.
- Never add or remove arms, hands, legs, feet, eyes, wings, tails, horns, ears, fins, claws, or extra body parts.
- Props must be held by existing hands only. Do not create extra hands, fingers, arms, tentacles, tails, or support limbs to hold props.
- If a pose is hard, simplify the pose or make the mascot smaller; do not change mascot anatomy.
- Light mascot: yellow round body, one glowing antenna, exactly two arms/hands, exactly two legs/feet, exactly one pair of yellow wings, no tail.
- Fire mascot: orange-red flame body, exactly two arms/hands, exactly two legs/feet, two front teeth, no wings, no tail, no extra flame limbs.
- Water mascot: blue water-drop body, exactly one eye, exactly two arms/hands, exactly two legs/feet, no wings, no tail, no extra eyes.
- Tree mascot: orange trunk body with green tree crown, exactly two arms/hands, exactly two legs/feet; leaves/birds/fruit are decoration, not extra limbs.
```

後製留白約束：

```text
- Do not create a page number badge.
- Do not create any crest/logo/seal/stamp/emblem anywhere.
- Leave the bottom-left and top-right corners empty for code overlay.
```

案例頁標題約束：

```text
- Every implemented application / workflow example slide must clearly mark that it is a case.
- The visible slide title must start with either "案例：" or "場租案例一／二／三：".
- Do not omit the word "案例" from case-slide titles.
```

AI 工作台關聯約束：

```text
- Each case slide must make the AI-workbench value explicit.
- If the case uses an API, show the API in the workflow, not only the final UI.
- For Google Calendar venue-rental slides, explicitly show: AI reads rental requests, checks conflicts, calls Google Calendar API, prepares calendar events, then a human confirms.
- Viewers should not wonder "what does this have to do with AI?"
```

術語白話化約束：

```text
- Avoid unexplained engineering terms in audience-facing slide text.
- Use 模擬執行.
- If English is needed, write it once as 模擬執行（dry-run） and explain: 先預覽結果，不直接改原始資料.
- After the first explanation, use only 模擬執行.
```

## 逐頁生成

使用 `chatgpt:image-batch` 逐頁生成，並保留同一 ChatGPT 對話脈絡：

```powershell
cd D:\projects\browser-automation-workflow
npm run chatgpt:image-batch -- --cdp-url http://127.0.0.1:9222 --reuse-chat --prompt-dir "D:\projects\browser-automation-workflow\scratch\ai-admin-workbench-mascot-only-web-3-force\prompts" --output-dir "D:\projects\browser-automation-workflow\output\ai-admin-workbench-mascot-only-web-3-force-raw" --output-prefix ai-admin-mascot-only-force --meta "D:\projects\browser-automation-workflow\output\ai-admin-workbench-mascot-only-web-3-force-raw\run-meta.json" --timeout-ms 900000 --idle-timeout-ms 20000 --poll-ms 3000
```

注意：

- 若 ChatGPT 回文字而不生圖，不要等到 15 分鐘 timeout。
- 可檢查頁面是否已無 `停止回應`，且沒有新增圖片。
- 必要時重送 prompt，並加強「Reply with image only」。

## 後製頁碼與校徽

使用 `overlay-brand-elements.js` 疊加頁碼與右上角校徽。正式輸出版建議不縮放原圖，避免破壞 ChatGPT 原始版面；校徽固定在右上角，頁碼固定在左下角，形成對角品牌識別：

```powershell
cd D:\projects\slidecraft-lab
node "D:\projects\slidecraft-lab\decks\ai-admin-workbench\overlay-brand-elements.js" --image-dir "D:\projects\browser-automation-workflow\output\ai-admin-workbench-final-17-raw" --output-dir "D:\projects\slidecraft-lab\decks\ai-admin-workbench\final-17-bottom-left-overlay" --logo "G:\我的雲端硬碟\111頂溪\01彩虹精靈\01頂溪.png" --total 17 --glob "ai-admin-workbench-final-*.png" --badge-x-ratio 0.016 --badge-y-ratio 0.936 --badge-w-ratio 0.056 --badge-h-ratio 0.038 --logo-height-ratio 0.07 --logo-margin-x-ratio 0.022 --logo-margin-y-ratio 0.018
```

本次確認後較穩定的參數：

- 頁碼寬度比例：`0.056`
- 頁碼高度比例：`0.038`
- 校徽高度比例：`0.07`

## 檢查清單

每次輸出後至少檢查：

- 圖片尺寸是否一致，本次為 `1672 x 941`
- 左下頁碼是否大小一致，且沒有遮住時間、省時數據、流程節點或其他重要訊息
- 右上校徽是否大小一致、沒有變形
- 內容區是否沒有額外校徽、假印章、假 logo
- 精靈是否可選擇 0-4 隻，且只有在不影響內容時才合理融入
- 品牌識別是否只是輔助，沒有搶走行政案例、流程圖、表格或提案重點
- 精靈是否過大、過多、位於中央，或讓畫面變成可愛海報而非行政簡報
- 精靈是否明顯變色、長出多餘肢體、尾巴、額外翅膀或額外眼睛
- 光精靈是否保留一對黃色翅膀，且沒有變成尾巴或新增第二對翅膀
- 火精靈是否沒有尾巴、額外火焰手腳或額外翅膀
- 海精靈是否維持單眼、兩手兩腳，沒有多眼或尾巴
- 樹精靈是否維持兩手兩腳，葉片、鳥與果實不可被畫成額外手腳
- 精靈是否遮住標題、流程、表格或重要文字
- 文字是否仍為繁體中文且可讀

## 本次測試輸出

只上傳四精靈 reference 的 raw 圖：

`D:\projects\browser-automation-workflow\output\ai-admin-workbench-mascot-only-web-3-force-raw`

後製頁碼與校徽版：

`D:\projects\slidecraft-lab\decks\ai-admin-workbench\mascot-only-web-3-force-overlay`

## 實務建議

正式簡報建議採此流程：

1. 製作或確認四精靈 reference sheet。
2. 開啟 ChatGPT CDP，確認登入 Pro 帳號。
3. 切到 `Thinking`。
4. 上傳四精靈 reference sheet，並通過附件預覽防呆。
5. 逐頁單張生成。
6. 下載 raw 圖。
7. 程式後製頁碼與校徽。
8. 人工逐張 QA。
9. 有漂移或遮擋者，重生該頁，不重生整份。

這個流程把「可變的情境插畫」交給 ChatGPT，把「不可變的品牌識別」交給程式，最符合頂溪國小正式簡報製作需求。
