# Nano Banana Sequence Prompts

這是 `new-taipei-school-lunch` deck 的同對話連續出圖 prompt pack。

Repo-level convention: [docs/prompt-pack-conventions.md](</c:/Users/user/projects/slidecraft-lab/docs/prompt-pack-conventions.md:1>)

用途：
- 在同一個 Gemini 對話中依序送出多張簡報主視覺 prompt
- 維持同一主角、同一色彩與整體風格的一致性
- 作為 `slidecraft-lab` 內的 deck-specific prompt source，而不是 automation script 本體

執行位置：

- 這組 prompts 應由 `browser-automation-workflow` 內的 Gemini prompt sequence 工具執行
- `slidecraft-lab` 只保存 prompt 內容、命名順序與 deck 脈絡

使用方式：

```powershell
# from browser-automation-workflow
npm run gemini:prompt-sequence -- --prompt-dir <path-to-slidecraft-lab>\prompts\new-taipei-school-lunch\nano-banana-sequence
```

輸出：
- automation repo 會留下執行截圖與執行紀錄
- 本 repo 內應保留經人工挑選後要進 deck 的圖片與相關說明

注意：
- 這組 prompts 的順序就是預期的出圖順序
- 這個資料夾不負責 session、下載流程或 Gemini 自動化基礎能力
- 若要保留原圖，仍需在 Gemini 介面中下載，並整理到 deck 或 exports 目錄
