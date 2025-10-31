window.addEventListener("load", () => {
  const status = document.getElementById("status");
  const scanBtn = document.getElementById("scanBtn");

  if (!window.alt1) {
    status.innerText = "⚠️ Alt1 not detected — open this inside Alt1 Toolkit.";
    return;
  }

  alt1.identifyAppUrl("./appconfig.json");
  status.innerText = "✅ Alt1 environment detected.";

  // Wait until a1lib loads
  function waitForLib() {
    if (typeof window.a1lib === "undefined") {
      status.innerText = "⌛ Loading Alt1 capture library...";
      console.log("Waiting for Alt1 capture library...");
      setTimeout(waitForLib, 500);
      return;
    }

    status.innerText = "✅ Alt1 + a1lib loaded successfully.";
    console.log("Alt1 + a1lib ready.");
    initCapture();
  }

  waitForLib();

  function initCapture() {
    scanBtn.addEventListener("click", () => {
      try {
        status.innerText = "⏳ Attempting capture...";
        console.log("Scan button clicked — attempting capture...");

        let img = null;

        if (window.a1lib && typeof a1lib.captureHoldFullRs === "function") {
          console.log("Using captureHoldFullRs()");
          img = a1lib.captureHoldFullRs();
        } else if (window.a1lib && typeof a1lib.capture === "function") {
          console.log("Using capture()");
          img = a1lib.capture();
        } else {
          console.warn("No capture function available on a1lib.");
          status.innerText = "⚠️ No capture function detected (a1lib incomplete).";
          return;
        }

        if (!img || !img.width) {
          console.warn("No image data returned from capture.");
          status.innerText = "❌ Capture failed — RuneScape not visible or not linked.";
          return;
        }

        status.innerText = `✅ Capture success (${img.width}x${img.height})`;
        console.log(`Capture success: ${img.width}x${img.height}`);

        // Show captured image preview
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.putImageData(img, 0, 0);
        canvas.style.width = "250px";
        canvas.style.marginTop = "10px";
        document.getElementById("controls").appendChild(canvas);
      } catch (err) {
        console.error("Capture error:", err);
        status.innerText = "⚠️ Error: " + err.message;
      }
    });
  }
});
