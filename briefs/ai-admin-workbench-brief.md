# AI 行政工作台 Brief

## Topic

`AI 行政工作台` 是以 `Codex 桌面版` 為主要入口，連接本機與雲端硬碟行政資料夾、行政知識庫、瀏覽器/API 自動化與必要時的開發工具，建立國小行政工作的 AI 協作流程。

原先構想以 `VS Code + Codex extension` 為主；但近期 Codex 桌面版已能直接讀取專案檔案與工作資料夾，因此目前工作台已從 VS Code 移到 Codex 桌面版。VS Code / Codex CLI 保留為進階開發、批次操作與程式碼維護時的輔助工具。

本簡報目標是推廣一套可落地的行政 AI 工作模式，並提案採購 `ChatGPT Pro 行政 AI 工作台建置帳號 1 組`，由指定承辦人保管操作，作為初期建置、測試、示範與流程開發工具。

正式提案版需掛名 `新北市永和區頂溪國民小學／頂溪國小`，並整合手動上傳的學校 logo / 校徽參考圖。

## Source Material

- `C:\Users\user\projects\ai-teaching-efficiency\docs\ai-admin-workbench-applications.md`
- `D:\文書組` 行政知識庫、AI 工作規則、場租與文書工作資料夾
- `C:\Users\user\projects\admin-workflow-automation`
- `C:\Users\user\projects\rental-dates`
- `C:\Users\user\projects\inventory-system2`
- `C:\Users\user\projects\doc2md-toolkit`
- `C:\Users\user\projects\browser-automation-workflow`
- `D:\projects\slidecraft-lab`

## Audience

- 校長、主任、行政同仁、資訊或採購相關承辦
- 對 AI 有興趣，但不一定熟悉 VS Code、API 或自動化；只需要理解 Codex 桌面版如何讀取資料夾、協助整理與產出行政文件
- 需要看到低成本、低風險、可試辦、可交接的導入方式

## Presentation Goal

讓學校理解：本案不是購買聊天機器人，而是建立一個可追蹤、可審核、可交接的行政 AI 工作台。

本案經費極可能由場租收入支應，因此簡報需要把場租案例放在提案重點。核心說法是：用場租收入改善場租管理流程，讓經費來源與改善對象一致，較容易取得支持。

希望簡報促成第一階段採購：

- `ChatGPT Pro 行政 AI 工作台建置帳號 1 組`
- 月費預算抓新台幣 4,000 元
- OpenAI 定價約新台幣 3,300 元，但學校採購需透過經銷商核銷，需加上稅金與相關手續成本
- 3 個月試辦約新台幣 12,000 元
- 由指定承辦人保管操作
- 產出 SOP、提示詞模板、自動化流程、簡報素材與教育訓練文件

## Narrative Direction

1. 行政工作不是缺努力，而是缺可累積的工作台。
2. AI 行政工作台把資料夾、規則、Codex 桌面版、瀏覽器與 API 串成一個可控流程。
3. 場租收入可優先回投場租管理，形成「收入支應、流程改善、承辦減負」的合理循環。
4. 本校已有多個可展示的落地案例，其中場租至少要放三個重點案例，出納組案例也應放入主線，因為節省時間可量化。
5. 安全機制以模擬執行（dry-run）、備份、人工確認與敏感資料保護為核心。
6. 第一階段用一組 Pro 帳號低成本試辦，先建置流程，再決定是否擴大。

## Production Mode

Full-page generation using ChatGPT web image generation.

- 每張投影片是一張完整 16:9 圖片。
- 使用同一個 ChatGPT 對話維持視覺連續性。
- 正式品牌版需先手動上傳頂溪國小 logo / 校徽參考圖。
- 先貼 brand primer，再逐張貼 prompt。
- 生成圖片下載後依序命名，放入 `exports/ai-admin-workbench/chatgpt-image-sequence/`。
- 選定圖片後複製到 `decks/ai-admin-workbench/images/`。
- 最終以 image-only PDF 匯出。

## Visual Direction

- 國小行政現場，不是企業科技簡報
- 乾淨、可信、溫暖、務實、有制度感
- 正式版需有頂溪國小校名與 logo / 校徽識別
- 每張投影片左下角需有一致頁碼徽章，例如 `01/17`，右上角保留校徽識別。
- 精靈可選擇 0-4 隻小型點綴；若會影響文字、流程、資料或主訊息，該頁可以不放精靈。
- 場景可包含辦公桌、資料夾、公文、會議筆記、行事曆、檢核表、Codex 桌面版工作區、瀏覽器工作台與檔案樹 / 對話協作面板
- 色彩：溫暖紙白、柔和灰、深綠、墨黑、淺金、少量行政藍
- 避免：霓虹科技感、企業簡報過度商業化、科幻機器人、大量程式碼、浮誇效率口號

## Slide Outline

1. Cover: AI 行政工作台
2. Why: 行政需要可累積的工作台
3. Positioning: 不是買聊天機器人
4. Architecture: 資料夾知識庫 + Codex 桌面版 + 瀏覽器/API
5. Case: 公文擬辦與每日分文建議
6. Funding Logic: 以場租收入改善場租管理
7. Rental Case 1: Google Calendar 場租行事曆
8. Rental Case 2: 場租日期填寫系統
9. Rental Case 3: VRMS 場租管理控制台
10. Case: 出納組保險申報、代收代辦費與薪資核算
11. Safety: 模擬執行（dry-run）、備份、人工確認
12. Procurement: Pro 建置帳號 1 組，月費預算抓 NT$4,000
13. Pilot: 三個月試辦成果
14. Expansion: 先建置，再擴散到教務處、學務處、總務處、輔導處、幼兒園
15. Appendix: 附錄補充案例，一張四格
16. Appendix: 附錄工作流能力，一張四格
17. Conclusion: 讓行政經驗留下來

## Appendix Layout Decision

- 附錄案例每張固定放 4 個。
- 採 2x2 四格卡片版型。
- 每格只放：案例名稱、所屬情境、一句用途、一句亮點。
- 不採 6 格，避免全頁生成時中文字過小或錯字風險提高。
- 附錄一採用：財產盤點與消耗用品管理、家長會選舉系統、行政簡報製作工作流、每日工作檢核與資料夾整理。
- 附錄二採用：Gmail 行政信件整理、會議記錄與語音逐字稿、文件轉 Markdown / Text、瀏覽器自動化工作流。
- 附錄只放本次正式採用的八個補充案例，不加入其他產品、舊工作流或無關個人專案。

## Constraints

- 使用繁體中文。
- 全頁生成，每張圖片文字要少而大。
- 正式品牌版每張需有校名或校徽識別，並使用一致頁碼。
- 不展示校長行事曆作為推廣案例。
- 不把 Pro 帳號描述為多人共用帳號。
- 不放敏感資料、帳號、token、calendar ID、個資、公文細節截圖。
- 第一階段方案只描述 ChatGPT Pro 建置帳號 1 組，不比較其他方案。

## Expected Output

- prompt pack: `prompts/ai-admin-workbench/chatgpt-image-sequence/`
- branded prompt pack: `prompts/ai-admin-workbench/chatgpt-brand-identity-sequence/`
- reviewed images: `exports/ai-admin-workbench/chatgpt-image-sequence/`
- deck package: `decks/ai-admin-workbench/`
- final PDF: `decks/ai-admin-workbench/final/ai-admin-workbench-chatgpt-images.pdf`
