const ctx = document.getElementById("riskChart");

new Chart(ctx, {
type: "line",
data: {
labels: ["", "", "", "", "", "", ""],
datasets: [
{
label: "Risk Curve",
data: [30, 45, 40, 60, 55, 70, 72],
borderColor: "#00c8ff",
backgroundColor: "rgba(0,200,255,0.15)",
fill: true,
tension: 0.4,
pointRadius: 0
},
{
label: "Loss Spike",
data: [5, 8, 6, 12, 9, 15, 12],
borderColor: "#ff4d4d",
backgroundColor: "rgba(255,80,80,0.2)",
fill: true,
tension: 0.5,
pointRadius: 0
}
]
},
options: {
responsive: true,
plugins: {
legend: { display: false }
},
scales: {
x: { display: false },
y: { display: false }
}
}
});