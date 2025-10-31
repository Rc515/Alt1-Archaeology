// Alt1 Archaeology Tracker — basic capture test
window.addEventListener("load", () => {
  // Check if running in Alt1
  if (!window.alt1) {
    document.getElementById("status").innerText =
      "⚠️ Alt1 not detected — open this inside Alt1 Toolkit.";
    return;
  }

  // Identify app to Alt1
  alt1.identifyAppUrl("./appconfig.json");

  const status = document.getElementById("status");
  const scanBtn = document.getElementById("scanBtn");

  status.innerText = "✅ Alt1 environment detected.";

  scanBtn.addEventListener("click", () => {
    try {
      // Capture current RuneScape screen
      const img = alt1.captureHoldFullRs();

      if (!img) {
        status.innerText = "❌ Capture failed — make sure RuneScape is visible.";
        return;
      }

      // Show success and size
      status.innerText = `✅ Capture success (${img.width}x${img.height}px).`;

      // (Optional) display preview for debugging
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(img, 0, 0);
      canvas.style.width = "200px";
      canvas.style.border = "1px solid #444";
      canvas.style.marginTop = "10px";
      document.getElementById("controls").appendChild(canvas);
    } catch (err) {
      status.innerText = "⚠️ Error: " + err.message;
      console.error(err);
    }
  });
});