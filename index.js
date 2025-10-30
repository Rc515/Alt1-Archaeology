// index.js — Alt1 Image Recognition Starter

// Wait for Alt1 to load
window.addEventListener("load", () => {
    if (!window.alt1) {
        alert("Alt1 is not detected. Please run this inside the Alt1 Toolkit.");
        return;
    }

    // Tell Alt1 that your app is running
    alt1.identifyAppUrl("./appconfig.json");

    // Basic UI confirmation
    const status = document.createElement("div");
    status.textContent = "Ready to scan for artefacts!";
    status.style.color = "#00ffcc";
    document.body.appendChild(status);
});

// Function to capture an area of your screen (for now, your bank)
function captureBankArea() {
    // This will capture the RuneScape window
    const img = a1lib.captureHoldFullRs();
    if (!img) {
        alert("Could not capture the RS window.");
        return;
    }

    // Save or display the image for testing
    img.save("bank_capture.png"); // optional, for debugging
    console.log("Captured bank area!");
}

// Add a test button in the UI
const btn = document.createElement("button");
btn.textContent = "Scan Bank";
btn.style.margin = "10px";
btn.onclick = captureBankArea;
document.body.appendChild(btn);
