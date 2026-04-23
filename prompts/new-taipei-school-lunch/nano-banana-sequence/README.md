# Nano Banana Sequence Prompts

這個資料夾給 `automation/gemini-prompt-sequence.js` 使用。

用途：
- 在同一個 Gemini 對話中，依序送出多張簡報主視覺 prompt
- 維持同一主角、同一色彩與整體風格的一致性

執行方式：

```powershell
npm run gemini:prompt-sequence -- --prompt-dir automation/prompts/nano-banana-sequence
```

輸出：
- 每一輪生成完成後，會在 `automation/output/gemini-sequence` 留整頁截圖
- 執行紀錄會寫到 `automation/output/gemini-prompt-sequence.json`

注意：
- 這支腳本目前只負責「同一對話連續送 prompt 並等待生成完成」
- 不處理下載圖片
- 若要保留原圖，需由使用者在 Gemini 介面中手動下載
