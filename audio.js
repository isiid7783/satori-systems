let audioCtx;
let osc;
let gain;

function initAudio() {
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

osc = audioCtx.createOscillator();
osc.type = "sine";
osc.frequency.value = 60;

gain = audioCtx.createGain();
gain.gain.value = 0;

osc.connect(gain);
gain.connect(audioCtx.destination);

osc.start();
}

function updateAudio(instability) {
if (!gain) return;

const target = instability < 0.1 ? 0 : instability * 0.15;
gain.gain.linearRampToValueAtTime(
target,
audioCtx.currentTime + 0.1
);

osc.frequency.value = 50 + instability * 40;
}

