let model = null;

async function loadModel() {
  model = await use.load();
}

loadModel();

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function compare() {
  if (!model) return;

  const a = document.getElementById("wordA").value.trim();
  const b = document.getElementById("wordB").value.trim();
  if (!a || !b) return;

  const embeddings = await model.embed([a, b]);
  const vectors = await embeddings.array();

  const similarity = cosineSimilarity(vectors[0], vectors[1]);
  const distance = 1 - similarity;

  document.getElementById("similarity").textContent =
    similarity.toFixed(3);

  document.getElementById("distance").textContent =
    distance.toFixed(3);

  document.getElementById("bar").style.width =
    `${Math.max(0, similarity) * 100}%`;
}
