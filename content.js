(async () => {
  const { wikirace } = await chrome.storage.local.get("wikirace");
  if (!wikirace?.started) return;

  const originalTitle = document.title;
  const current = document.title.replace(" - Wikipedia", "");
  const searchForm = document.getElementById('searchform');
  if (searchForm) {
    searchForm.style.display = 'none';
  }
  document.querySelectorAll(
    '.mw-references-wrap, .reference, sup.reference, .reflist, ol.references, div.references'
  ).forEach(el => el.style.display = 'none');

  document.querySelectorAll('h2, h3, h4').forEach(el => {
    const span = el.querySelector('span');
    if (span && /references|notes|anmerkungen|quellen|literatur/i.test(span.id || span.textContent)) {
      el.style.display = 'none';
    }
  });
  //Show timer in Tab 
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

  // Start timer only for first time
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
