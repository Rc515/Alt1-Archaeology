/// <reference path="https://runescape.alt1.app/static/js/alt1lib.js" />

// Alt1 Archaeology Tracker — Capture test build
window.addEventListener("load", () => {
  const status = document.getElementById("status");
  const scanBtn = document.getElementById("scanBtn");

  // Confirm Alt1 environment
  if (!window.alt1) {
    status.innerText = "⚠️ Alt1 not detected — open this inside the Alt1 Toolkit.";
    return;
  }

  // Identify app with Alt1
  alt1.identifyAppUrl("./appconfig.json");
  status.innerText = "✅ Alt1 environment detected.";

  // When Scan Bank Tab button is clicked
  scanBtn.addEventListener("click", () => {
    status.innerText = "⏳ Attempting capture...";
    console.log("Attempting capture...");

    try {
      // Attempt to capture RuneScape window
      const img = a1lib.captureHoldFullRs();

      if (!img || !img.width) {
        status.innerText = "❌ Capture failed — RuneScape not visible or invalid image.";
        return;
      }

      // Display capture info
      status.innerText = `✅ Capture success (${img.width}x${img.height}px)`;

      // Show preview (for debug)
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(img, 0, 0);
      canvas.style.width = "250px";
      canvas.style.border = "1px solid #555";
      canvas.style.marginTop = "10px";
      document.getElementById("controls").appendChild(canvas);
    } catch (err) {
      console.error(err);
      status.innerText = "⚠️ Error: " + err.message;
    }
  });
});
