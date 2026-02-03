let model = null;

async function loadModel() {
  model = await use.load();
}
loadModel();

function cosineSimilarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function buildNetwork() {
  if (!model) return;

  const words = document.getElementById("words")
    .value.split("\n")
    .map(w => w.trim())
    .filter(Boolean);

  if (words.length < 2) return;

  const embeddings = await model.embed(words);
  const vectors = await embeddings.array();

  const edges = [];

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const sim = cosineSimilarity(vectors[i], vectors[j]);
      edges.push({
        a: words[i],
        b: words[j],
        similarity: sim,
        distance: 1 - sim
      });
    }
  }

  renderNetwork(edges);
  saveHistory(edges);
}

function renderNetwork(edges) {
  const net = document.getElementById("network");
  net.innerHTML = "";

  edges
    .sort((a, b) => b.similarity - a.similarity)
    .forEach(e => {
      const div = document.createElement("div");
      div.className = "edge";
      div.textContent =
        `${e.a} ↔ ${e.b} | similarity ${e.similarity.toFixed(3)}`;
      net.appendChild(div);
    });
}

function saveHistory(edges) {
  const record = {
    time: new Date().toISOString(),
    edges
  };
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.unshift(record);
  localStorage.setItem("history", JSON.stringify(history.slice(0, 10)));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const el = document.getElementById("history");
  el.innerHTML = "";

  history.forEach(h => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = `${h.time} — ${h.edges.length} relations`;
    el.appendChild(div);
  });
}

renderHistory();
