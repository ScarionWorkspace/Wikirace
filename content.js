(async () => {
  const { wikirace } = await chrome.storage.local.get("wikirace");
  if (!wikirace?.started) return;

  const originalTitle = document.title;
  const current = document.title.replace(" - Wikipedia", "");

  // Timer im Tab-Titel anzeigen
  let timerInterval;
  function startTimer() {
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - wikirace.timestamp;
      const seconds = Math.floor(elapsed / 1000) % 60;
      const minutes = Math.floor(elapsed / 60000) % 60;
      const hours = Math.floor(elapsed / 3600000);
      const timeStr = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');
      document.title = `Wikipedia Race — ${timeStr}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    document.title = originalTitle;
  }

  // Starte Timer nur beim ersten Aufruf
  if (!window.wikiraceTimerStarted) {
    startTimer();
    window.wikiraceTimerStarted = true;
  }

  if (wikirace.path[wikirace.path.length - 1] !== current) {
    wikirace.path.push(current);
    await chrome.storage.local.set({ wikirace });
  }

  if (current.toLowerCase() === wikirace.target.toLowerCase()) {
    stopTimer();
    const duration = Math.round((Date.now() - wikirace.timestamp) / 1000);
    alert(`🎉 You reached '${wikirace.target}' in ${wikirace.path.length - 1} clicks and ${duration} seconds!`);
    await chrome.storage.local.remove("wikirace");
    window.wikiraceTimerStarted = false;
  }
})();
