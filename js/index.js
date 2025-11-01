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

  // --- Capture in Alt1 mode ---
function captureAlt1() {
  const capture = a1lib.captureHoldFullRs();
  if (!capture) throw new Error("No capture data from Alt1.");

  console.log("🧩 Alt1 capture object:", capture);

  let imgData;

  // ✅ Preferred: official Alt1 capture conversion
  if (typeof capture.toImageData === "function") {
    imgData = capture.toImageData();
    console.log("✅ Used capture.toImageData()");
  } else if (capture instanceof ImageData) {
    imgData = capture;
    console.log("🧩 Using direct ImageData");
  } else {
    // Fallback for stubs / raw buffer
    const buf = capture.raw || capture.data || capture.img || capture.buf8 || null;
    if (!buf) throw new Error("No image buffer found in capture object.");
    console.log("📦 Buffer length:", buf.length, "bytes");
    imgData = new ImageData(new Uint8ClampedArray(buf), capture.width, capture.height);
  }

  // Draw the image
  canvas.width = imgData.width;
  canvas.height = imgData.height;
  ctx.putImageData(imgData, 0, 0);

  // 🟩 Draw a green border + text overlay for debugging
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, imgData.width, imgData.height);

  ctx.fillStyle = "lime";
  ctx.font = "20px monospace";
  ctx.fillText("Captured from RS", 10, 30);

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
