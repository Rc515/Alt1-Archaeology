// index.js — Alt1 Archaeology Tracker test
// This file just confirms Alt1 can load and run JavaScript

window.addEventListener("load", () => {
    // Detect if the app is actually inside Alt1
    if (!window.alt1) {
        alert("Alt1 not detected — open this inside the Alt1 Toolkit.");
        return;
    }

    // Identify the app to Alt1
    alt1.identifyAppUrl("./appconfig.json");

    // Confirm everything loaded
    console.log("Archaeology Tracker loaded successfully!");
    alert("Archaeology Tracker loaded successfully!");

    // Add a simple button to test events
    const btn = document.createElement("button");
    btn.textContent = "Click to test JavaScript!";
    btn.style.padding = "10px";
    btn.style.marginTop = "20px";
    btn.style.fontWeight = "bold";
    btn.onclick = () => alert("Button click works!");
    document.body.appendChild(btn);
});
