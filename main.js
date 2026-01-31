let scene, camera, renderer, mesh;
let lastAccel = null;
let stability = 0;
const smoothing = 0.9;

let started = false;

initScene();
animate();

function initScene() {
scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / window.innerHeight,
0.1,
100
);
camera.position.z = 3;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1, 3);
const material = new THREE.MeshStandardMaterial({
color: 0xffffff,
roughness: 0.4,
metalness: 0.1
});

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);

window.addEventListener("resize", onResize);
}

function onResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}

function requestMotionPermission() {
if (
typeof DeviceMotionEvent !== "undefined" &&
typeof DeviceMotionEvent.requestPermission === "function"
) {
DeviceMotionEvent.requestPermission().then(response => {
if (response === "granted") {
startMotion();
}
});
} else {
startMotion();
}
}

function startMotion() {
if (started) return;
started = true;
document.getElementById("hint")?.remove();
initAudio();

window.addEventListener("devicemotion", handleMotion);
}

function handleMotion(e) {
const a = e.accelerationIncludingGravity;
if (!a) return;

const current = { x: a.x || 0, y: a.y || 0, z: a.z || 0 };

if (lastAccel) {
const dx = current.x - lastAccel.x;
const dy = current.y - lastAccel.y;
const dz = current.z - lastAccel.z;
const delta = Math.sqrt(dx*dx + dy*dy + dz*dz);

stability = smoothing * stability + (1 - smoothing) * delta;
}

lastAccel = current;
}

function animate() {
requestAnimationFrame(animate);

const instability = Math.min(stability * 5, 1);

mesh.rotation.x += 0.002 + instability * 0.01;
mesh.rotation.y += 0.003 + instability * 0.01;

mesh.scale.setScalar(1 + instability * 0.2);

mesh.material.roughness = 0.3 + instability * 0.4;

updateAudio(instability);

renderer.render(scene, camera);
}

document.body.addEventListener("click", requestMotionPermission, { once: true });
