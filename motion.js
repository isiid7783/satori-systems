
let lastAccel = null;
let stability = 0;
let smoothing = 0.9; // 0.8-0.95で調整

function requestPermission() {
if (
typeof DeviceMotionEvent !== "undefined" &&
typeof DeviceMotionEvent.requestPermission === "function"
) {
DeviceMotionEvent.requestPermission().then(response => {
if (response === "granted") {
window.addEventListener("devicemotion", handleMotion);
}
});
} else {
window.addEventListener("devicemotion", handleMotion);
}
}

function handleMotion(event) {
const a = event.accelerationIncludingGravity;
if (!a) return;

const current = {
x: a.x || 0,
y: a.y || 0,
z: a.z || 0
};

if (lastAccel) {
const dx = current.x - lastAccel.x;
const dy = current.y - lastAccel.y;
const dz = current.z - lastAccel.z;

const delta = Math.sqrt(dx*dx + dy*dy + dz*dz);

// 安定度係数（指数平滑）
stability = smoothing * stability + (1 - smoothing) * delta;
}

lastAccel = current;

document.getElementById("debug").innerText =
"stability: " + stability.toFixed(4);
}

// 初回タップで開始（iOS対策）
document.body.addEventListener("click", requestPermission, { once: true });


