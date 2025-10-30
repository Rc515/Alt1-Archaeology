// index.js — RuneScape Archaeology Auto Wiki Tracker
// Uses image recognition + Wiki API

window.addEventListener("load", () => {
    if (!window.alt1) {
        alert("Please open inside Alt1 Toolkit.");
        return;
    }

    alt1.identifyAppUrl("./appconfig.json");
    setupUI();
});

function setupUI() {
    const btn = document.createElement("button");
    btn.textContent = "Scan Bank for Artefacts";
    btn.className = "scan-btn";
    btn.onclick = scanBank;
    document.body.appendChild(btn);

    const results = document.createElement("div");
    results.id = "results";
    results.style.marginTop = "15px";
    document.body.appendChild(results);
}

async function scanBank() {
    const results = document.getElementById("results");
    results.textContent = "Scanning...";

    const img = a1lib.captureHoldFullRs();
    if (!img) {
        results.textContent = "Could not capture RuneScape window.";
        return;
    }

    const artefacts = [
        { name: "Broken sword", file: "templates/broken_sword.png" },
        { name: "Ancient vase", file: "templates/ancient_vase.png" },
        { name: "Damaged shield", file: "templates/damaged_shield.png" }
    ];

    let found = [];

    for (const art of artefacts) {
        try {
            const template = await a1lib.ImageDetect.loadFromUrl(art.file);
            const matches = img.findSubimage(template);

            if (matches.length > 0) {
                found.push(art);
            }
        } catch (e) {
            console.error("Error loading template:", art.file, e);
        }
    }

    if (found.length === 0) {
        results.textContent = "No artefacts detected.";
        return;
    }

    results.innerHTML = "<b>Detected artefacts:</b><br>";
    for (const art of found) {
        const info = await fetchWikiInfo(art.name);
        const snippet = info.snippet
            ? info.snippet.replace(/<\/?[^>]+(>|$)/g, "") // strip HTML
            : "No description found.";
        results.innerHTML += `<div><b>${info.title}</b>: ${snippet}</div><hr>`;
    }
}

// Fetch info from RuneScape Wiki
async function fetchWikiInfo(itemName) {
    const url = `https://runescape.wiki/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(itemName)}&prop=extracts&exintro=true`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const page = pages[Object.keys(pages)[0]];
    return {
        title: page.title,
        snippet: page.extract
    };
}
