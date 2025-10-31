// a1lib.js — minimal mock for Alt1 capture API

window.a1lib = {
  capture: () => {
    console.log("a1lib.capture() called (stub)");
    return { width: 1920, height: 1080, data: new ImageData(1920, 1080) };
  },
  captureHoldFullRs: () => {
    console.log("a1lib.captureHoldFullRs() called (stub)");
    return { width: 1920, height: 1080, data: new ImageData(1920, 1080) };
  }
};
