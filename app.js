let nodes = [];
let edges = [];

function refreshSelectors() {
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  from.innerHTML = "";
  to.innerHTML = "";

  nodes.forEach(n => {
    const o1 = document.createElement("option");
    const o2 = document.createElement("option");
    o1.value = o2.value = n.id;
    o1.text = o2.text = n.label;
    from.add(o1);
    to.add(o2);
  });
}

function addNode() {
  const label = document.getElementById("nodeLabel").value.trim();
  if (!label) return;

  const id = "n" + (nodes.length + 1);
  nodes.push({ id, label });
  document.getElementById("nodeLabel").value = "";
  refreshSelectors();
  render();
}

function addEdge() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const type = document.getElementById("type").value;

  edges.push({ from, to, type, strength: Math.random() });
  render();
}

function render() {
  const out = {
    nodes,
    edges
  };
  document.getElementById("output").textContent =
    JSON.stringify(out, null, 2);
}

