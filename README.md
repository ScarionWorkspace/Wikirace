# 🧭 Wikipedia Race Chrome Extension

This is a browser extension that lets you play the classic [Wikipedia Game](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game) — but directly in your browser. Set a start and target article and race to reach the target by clicking only on internal Wikipedia links!

## 🚀 Features

- ⏱️ Tracks your path through Wikipedia pages
- 🎯 Alerts you when you reach your target
- 🔗 Copy and share "seeds" to play the same challenge with friends
- 🌍 Supports all Wikipedia languages (English, German, French, etc.)
- 🧠 Uses a compact seed format like `en::Cat->Quantum_mechanics`

## 📦 Installation

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your browser.
3. Enable **Developer mode** (top-right).
4. Click **"Load unpacked"** and select the folder.

## 🕹️ How to Play

1. Click the extension icon.
2. Enter:
   - A start article
   - A target article
   - A language (e.g. `en` for English, `de` for German)
3. Click **Start Race**.
4. A new tab opens at your start article — begin clicking!
5. When you reach the target, a message will pop up with your stats.

## 🔁 Seeds

You can generate and share a **seed** using this format:

<language_code>::<start_article>-><target_article>


Examples:

- `en::Cat->Quantum_mechanics`
- `de::Kater->Quantenmechanik`

Paste the seed in the popup to pre-fill the race configuration, or pass it via a URL query like:

chrome-extension://<EXTENSION_ID>/popup.html?seed=de::Kater->Quantenmechanik


> Seeds are useful for sharing exact challenges with friends!

## ✅ Example Use Cases

- Challenge friends to beat your path in fewer clicks
- Host races with fixed seeds across different Wikipedia languages
- Test your link-finding intuition and knowledge

## 🛠️ TODO

Planned features and improvements:

- 👥 **Multiplayer support** (real-time race with others)
- ⏳ **Visible timer and click counter** during the race
- 🎲 **Random seed generator** using popular articles
- 🔐 **Better seed format** with optional difficulty metadata

## 🧾 License

MIT License — free to use, modify, and share.
