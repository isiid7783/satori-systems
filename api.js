window.SemanticAPI = {
  async distance(a, b) {
    if (!model) await loadModel();
    const embeddings = await model.embed([a, b]);
    const v = await embeddings.array();
    const sim = cosineSimilarity(v[0], v[1]);
    return {
      similarity: sim,
      distance: 1 - sim
    };
  },

  async network(words) {
    if (!model) await loadModel();
    const emb = await model.embed(words);
    const vecs = await emb.array();

    const edges = [];
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        const sim = cosineSimilarity(vecs[i], vecs[j]);
        edges.push({
          from: words[i],
          to: words[j],
          similarity: sim,
          distance: 1 - sim
        });
      }
    }
    return edges;
  }
};
