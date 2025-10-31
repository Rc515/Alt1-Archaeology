window.addEventListener("load", () => {
  const scanBtn = document.getElementById("scanBtn");
  const statusDiv = document.getElementById("status");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.style.margin = "10px auto";
  document.body.appendChild(canvas);

  const inAlt1 = typeof window.alt1 !== "undefined";

  if (inAlt1) {
    statusDiv.innerHTML = "✅ Alt1 environment detected.";
  } else {
    statusDiv.innerHTML = "🧩 Browser mode — using test image.";
  }

  async function showImage(imgData) {
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    ctx.putImageData(imgData, 0, 0);
  }

  async function loadTestImage() {
    const img = new Image();
    img.src = "./assets/test_bank.png";
    await img.decode();

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    statusDiv.innerHTML = "🧩 Loaded test bank image.";
  }

  scanBtn.onclick = async () => {
    statusDiv.innerHTML = "⏳ Scanning...";

    try {
      if (inAlt1) {
        const imgData = a1lib.captureHoldFullRs();
        await showImage(imgData);
        statusDiv.innerHTML = `✅ Capture success (${imgData.width}x${imgData.height})`;
      } else {
        await loadTestImage();
      }
    } catch (e) {
      console.error(e);
      statusDiv.innerHTML = `⚠️ Error: ${e.message}`;
    }
  };
});
