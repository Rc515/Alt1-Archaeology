// Alt1 Archaeology Tracker — Full Capture Test Version (working)
// Includes fallback and visual preview of RuneScape capture

window.addEventListener("load", () => {
  const status = document.getElementById("status");
  const scanBtn = document.getElementById("scanBtn");

  // Confirm Alt1 environment
  if (!window.alt1) {
    status.innerText = "⚠️ Alt1 not detected — open this inside Alt1 Toolkit.";
    return;
  }

  // Identify app to Alt1 Toolkit
  alt1.identifyAppUrl("./appconfig.json");
  status.innerText = "✅ Alt1 environment detected.";

  // Wait until a1lib capture library is loaded
  function waitForLib() {
    if (typeof window.a1lib === "undefined") {
      console.log("Waiting for Alt1 capture library...");
      setTimeout(waitForLib, 300);
      return;
    }

    status.innerText = "✅ Alt1 + a1lib loaded successfully.";
    console.log("Alt1 + a1lib ready.");
    initCapture();
  }

  waitForLib();

  // Initialize capture button logic
  function initCapture() {
    scanBtn.addEventListener("click", () => {
      try {
        status.innerText = "⏳ Attempting capture...";
        console.log("Attempting capture...");

        let img = null;

        // Try full RuneScape capture first
        if (a1lib && typeof a1lib.captureHoldFullRs === "function") {
          img = a1lib.captureHoldFullRs();
        } else if (a1lib && typeof a1lib.capture === "function") {
          img = a1lib.capture();
        }

        if (!img || !img.width) {
          status.innerText = "❌ Capture failed — RuneScape not visible or invalid image.";
          console.warn("Capture returned empty or invalid image.");
          return;
        }

        // Display success message
        status.innerText = `✅ Capture success (${img.width}x${img.height}px)`;
        console.log(`Capture success: ${img.width}x${img.height}`);

        // Show preview canvas for debugging
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.putImageData(img, 0, 0);
        canvas.style.width = "250px";
        canvas.style.border = "1px solid #555";
        canvas.style.marginTop = "10px";

        // Remove any previous preview
        const oldCanvas = document.querySelector("#controls canvas");
        if (oldCanvas) oldCanvas.remove();

        document.getElementById("controls").appendChild(canvas);
      } catch (err) {
        console.error("Capture error:", err);
        status.innerText = "⚠️ Error: " + err.message;
      }
    });
  }
});
