// a1lib.js — safe stub that works in browser and Alt1

window.a1lib = {
  capture: () => {
    console.log("a1lib.capture() called (stub)");

    // Create a fake blank ImageData (black 200x100)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(200, 100); // <-- This is real ImageData
    for (let i = 0; i < img.data.length; i += 4) {
      img.data[i] = 30;     // R
      img.data[i + 1] = 30; // G
      img.data[i + 2] = 30; // B
      img.data[i + 3] = 255; // A
    }

    return img;
  },

  captureHoldFullRs: () => {
    console.log("a1lib.captureHoldFullRs() called (stub)");
    return window.a1lib.capture(); // just reuse the one above
  }
};
