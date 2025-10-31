// alt1lib.js — minimal Alt1 overlay + identifyApp stub

window.alt1 = window.alt1 || {};

window.alt1.identifyAppUrl = function (url) {
  console.log("Alt1 identifyAppUrl:", url);
};

window.alt1.overlayRect = function (x, y, w, h, color) {
  console.log(`Drawing overlay rect at (${x},${y}) size ${w}x${h} color ${color}`);
};
