window.addEventListener("load", () => {
  const status = document.getElementById("status");
  const scanBtn = document.getElementById("scanBtn");

  if (!window.alt1) {
    status.innerText = "⚠️ Alt1 not detected — open this inside Alt1 Toolkit.";
    return;
  }

  alt1.identifyAppUrl("./appconfig.json");
  status.innerText = "✅ Alt1 environment detected.";

  function waitForLib() {
    if (typeof window.a1lib === "undefined") {
      console.log("Waiting for a1lib...");
      status.innerText = "⌛ Loading Alt1 capture library...";
      setTimeout(waitForLib, 300);
      return;
    }
    status.innerText = "✅ Alt1 + a1lib loaded successfully.";
    initCapture();
  }

  waitForLib();

  function initCapture() {
    scanBtn.addEventListener("click", () => {
      try {
        status.innerText = "⏳ Attempting capture...";
        console.log("Attempting capture...");

        let img = null;
        if (a1lib && typeof a1lib.captureHoldFullRs === "function") {
          img = a1lib.captureHoldFullRs();
        } else if (a1lib && typeof a1lib.capture === "function") {
          img = a1lib.capture();
        }

        if (!img || !img.width) {
          status.innerText = "❌ Capture failed — RuneScape not visible or invalid image.";
          return;
        }

        status.innerText = `✅ Capture success (${img.width}x${img.height}px)`;

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.putImageData(img, 0, 0);
        canvas.style.width = "250px";
        canvas.style.marginTop = "10px";
        canvas.style.border = "1px solid #555";
        document.getElementById("controls").appendChild(canvas);
      } catch (err) {
        console.error(err);
        status.innerText = "⚠️ Error: " + err.message;
      }
    });
  }
});
