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
  const inAlt1 = typeof window.alt1 !== "undefined" && alt1.version;

  if (inAlt1) {
    statusDiv.innerHTML = "✅ Alt1 environment detected.";
  } else {
    statusDiv.innerHTML = "🧩 Browser mode — will use test image.";
  }

  // Load a static test image (for Chrome / GitHub mode)
  async function loadTestImage() {
    const img = new Image();
    img.src = "./assets/test_bank.png"; // Make sure this file exists!
    await img.decode();

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    statusDiv.innerHTML = `🧩 Loaded test image (${img.width}x${img.height})`;
  }

  // Show a real capture (Alt1 mode)
function captureAlt1() {
  // Capture from RuneScape window
  const capture = a1lib.captureHoldFullRs();

  if (!capture || !capture.raw) {
    throw new Error("Failed to get Alt1 capture data — ensure RS is visible.");
  }

  // Convert the raw image buffer to ImageData manually
  const imgData = new ImageData(
    new Uint8ClampedArray(capture.raw),
    capture.width,
    capture.height
  );

  // Draw to canvas
  canvas.width = capture.width;
  canvas.height = capture.height;
  ctx.putImageData(imgData, 0, 0);

  statusDiv.innerHTML = `✅ Capture success (${capture.width}x${capture.height})`;
}


  // Button click
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
