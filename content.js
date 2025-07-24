(async () => {
  const { wikirace } = await chrome.storage.local.get("wikirace");
  if (!wikirace?.started) return;

  const current = document.title.replace(" - Wikipedia", "");

  if (wikirace.path[wikirace.path.length - 1] !== current) {
    wikirace.path.push(current);
    await chrome.storage.local.set({ wikirace });
  }

  if (current.toLowerCase() === wikirace.target.toLowerCase()) {
    const duration = Math.round((Date.now() - wikirace.timestamp) / 1000);
    alert(`🎉 You reached '${wikirace.target}' in ${wikirace.path.length - 1} clicks and ${duration} seconds!`);
    await chrome.storage.local.remove("wikirace");
  }
})();