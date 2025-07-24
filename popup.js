document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const seed = params.get('seed');
    if (seed && seed.includes("::") && seed.includes("->")) {
        const [lang, pair] = seed.split("::");
        const [start, target] = pair.split("->");
        document.getElementById('lang').value = lang;
        document.getElementById('start').value = start.replace(/_/g, " ");
        document.getElementById('target').value = target.replace(/_/g, " ");
    }
});


document.getElementById('startRace').addEventListener('click', async () => {
    const lang = document.getElementById('lang').value;
    const start = document.getElementById('start').value.trim();
    const target = document.getElementById('target').value.trim();

    if (!lang || !start || !target) return alert("Please fill in all fields.");

    await chrome.storage.local.set({
        wikirace: {
            lang,
            start,
            target,
            path: [],
            started: true,
            timestamp: Date.now()
        }
    });

    chrome.tabs.create({
        url: `https://${lang}.wikipedia.org/wiki/${start.replace(/ /g, "_")}`
    });

    document.getElementById('status').textContent = `Game started! Get to '${target}' on ${lang}.wikipedia.org`;
});


document.getElementById('copySeed').addEventListener('click', () => {
    const lang = document.getElementById('lang').value;
    const start = document.getElementById('start').value.trim().replace(/ /g, "_");
    const target = document.getElementById('target').value.trim().replace(/ /g, "_");

    const seed = `${lang}::${start}->${target}`;
    navigator.clipboard.writeText(seed);
    alert(`Seed copied: ${seed}`);
});


document.getElementById('useSeed').addEventListener('click', () => {
    const seed = document.getElementById('seedInput').value;
    if (!seed.includes("::") || !seed.includes("->")) return alert("Invalid seed format!");
    const [lang, pair] = seed.split("::");
    const [start, target] = pair.split("->");
    document.getElementById('lang').value = lang;
    document.getElementById('start').value = start.replace(/_/g, " ");
    document.getElementById('target').value = target.replace(/_/g, " ");
});
