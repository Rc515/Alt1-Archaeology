// a1lib.js — fully compatible stub for Alt1 & browser testing

(function () {
  console.log("✅ a1lib.js loaded");

  function createImageData(width, height, color = [40, 40, 40]) {
    // Create a real ImageData object via an offscreen canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(width, height);

    // Fill with a placeholder color
    for (let i = 0; i < img.data.length; i += 4) {
      img.data[i] = color[0];     // R
      img.data[i + 1] = color[1]; // G
      img.data[i + 2] = color[2]; // B
      img.data[i + 3] = 255;      // A
    }
    return img;
  }

  // The fake capture functions
  const fakeCapture = () => {
    console.log("📸 Stub capture triggered");
    // Returns a REAL ImageData object
    return createImageData(300, 150);
  };

  window.a1lib = {
    capture: fakeCapture,
    captureHoldFullRs: fakeCapture,
  };
})();
