window.addEventListener("load", () => {
  const scanBtn = document.getElementById("scanBtn");
  const statusDiv = document.getElementById("status");

  // Create and attach a canvas for showing images
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.style.margin = "10px auto";
  document.body.appendChild(canvas);

  // Detect if Alt1 is running
  const inAlt1 = typeof window.alt1 !== "undefined" && !!window.alt1;

  statusDiv.innerHTML = inAlt1
    ? "✅ Alt1 environment detected."
    : "🧩 Browser mode — will use test image.";

  // Load a static test image (for Chrome / GitHub mode)
  async function loadTestImage() {
    const img = new Image();
    img.src = "./assets/test_bank.png"; // ensure file exists!
    await img.decode();

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    statusDiv.innerHTML = `🧩 Loaded test image (${img.width}x${img.height})`;
  }

  // --- Capture in Alt1 mode ---
  function captureAlt1() {
    if (!window.a1lib || !a1lib.captureHoldFullRs) {
      throw new Error("a1lib not available (Alt1 did not inject).");
    }

    const capture = a1lib.captureHoldFullRs();
    if (!capture) throw new Error("No capture data from Alt1.");

    console.log("🧩 Alt1 capture object:", capture);

    // Preferred draw path in Alt1 (some capture objects have this)
    if (typeof capture.toCanvas === "function") {
      capture.toCanvas(canvas);
      statusDiv.innerHTML = `✅ Capture success (${capture.width}x${capture.height})`;
      return;
    }

    let imgData;

    // Some versions expose a helper
    if (typeof capture.toImageData === "function") {
      imgData = capture.toImageData();
      console.log("✅ Used capture.toImageData()");
    } else if (capture instanceof ImageData) {
      imgData = capture;
      console.log("🧩 Using direct ImageData");
    } else {
      const buf = capture.raw || capture.data || capture.img || capture.buf8 || null;
      if (!buf) throw new Error("No image buffer found in capture object.");
      console.log("📦 Buffer length:", buf.length, "bytes");
      imgData = new ImageData(new Uint8ClampedArray(buf), capture.width, capture.height);
    }

    // Draw manually
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    ctx.putImageData(imgData, 0, 0);

    // Debug frame
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, imgData.width, imgData.height);
    ctx.fillStyle = "lime";
    ctx.font = "18px monospace";
    ctx.fillText("Captured from RS", 10, 28);

    statusDiv.innerHTML = `✅ Capture success (${imgData.width}x${imgData.height})`;
  }

  // --- Button click ---
  scanBtn.onclick = async () => {
    try {
      if (inAlt1) {
        captureAlt1();
      } else {
        await loadTestImage();
      }
    } catch (err) {
      console.error(err);
      statusDiv.innerHTML = `⚠️ ${err.message}`;
    }
  };
});
