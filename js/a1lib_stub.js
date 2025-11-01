// Minimal stub so the app runs in a normal browser without Alt1.
window.a1lib = {
  // Emulate a capture by returning ImageData from a test image synchronously
  captureHoldFullRs: function () {
    // Draw a small 300x150 image (same size we've been testing with)
    // using test_bank.png if present, otherwise a gray box.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 150;

    const img = new Image();
    img.src = './assets/test_bank.png';

    // NOTE: we can't block here for async decode, so we just draw a label
    // and return a gray ImageData immediately. The main script handles
    // "browser mode" with a proper async loader anyway.
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff66';
    ctx.font = '16px monospace';
    ctx.fillText('Stub capture (browser)', 10, 25);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Match the shape used in the main code
    imgData.width = canvas.width;
    imgData.height = canvas.height;
    return imgData;
  }
};

// Give the same top-level flag your code uses
window.alt1 = undefined; // explicitly "not Alt1"
