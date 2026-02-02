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
  const out = { nodes, edges };

  // JSON表示（既存機能）
  document.getElementById("output").textContent =
    JSON.stringify(out, null, 2);

  // 関係可視化
  const view = document.getElementById("edges-view");
  view.innerHTML = "";

  edges.forEach(e => {
    const div = document.createElement("div");
    div.classList.add("edge");

    if (e.irreversible === true) {
      div.classList.add("edge-irreversible");
    } else if (e.irreversible === false) {
      div.classList.add("edge-reversible");
    } else {
      div.classList.add("edge-unknown");
    }

    const from = nodes.find(n => n.id === e.from)?.label || e.from;
    const to = nodes.find(n => n.id === e.to)?.label || e.to;

    div.textContent = `${from} → ${to} [${e.type}]`;
    view.appendChild(div);
  });
}


const I18N = {
  ja: {
    title: "Plato System",
    nodePlaceholder: "概念（1語）",
    addNode: "ノード追加",
    addEdge: "関係追加",
    causal: "因果",
    contradiction: "矛盾",
    containment: "包含",
    analogy: "類比",
    negation: "否定"
  },
  en: {
    title: "Plato System",
    nodePlaceholder: "Concept (one word)",
    addNode: "Add Node",
    addEdge: "Add Relation",
    causal: "Causal",
    contradiction: "Contradiction",
    containment: "Containment",
    analogy: "Analogy",
    negation: "Negation"
  },
  es: {
    title: "Plato System",
    nodePlaceholder: "Concepto (una palabra)",
    addNode: "Agregar nodo",
    addEdge: "Agregar relación",
    causal: "Causal",
    contradiction: "Contradicción",
    containment: "Contención",
    analogy: "Analogía",
    negation: "Negación"
  },
  "zh-cn": {
    title: "Plato System",
    nodePlaceholder: "概念（一个词）",
    addNode: "添加节点",
    addEdge: "添加关系",
    causal: "因果",
    contradiction: "矛盾",
    containment: "包含",
    analogy: "类比",
    negation: "否定"
  },
  "zh-tw": {
    title: "Plato System",
    nodePlaceholder: "概念（單一詞）",
    addNode: "新增節點",
    addEdge: "新增關係",
    causal: "因果",
    contradiction: "矛盾",
    containment: "包含",
    analogy: "類比",
    negation: "否定"
  },
  fr: {
    title: "Plato System",
    nodePlaceholder: "Concept (un mot)",
    addNode: "Ajouter un nœud",
    addEdge: "Ajouter une relation",
    causal: "Causal",
    contradiction: "Contradiction",
    containment: "Inclusion",
    analogy: "Analogie",
    negation: "Négation"
  },
  de: {
    title: "Plato System",
    nodePlaceholder: "Begriff (ein Wort)",
    addNode: "Knoten hinzufügen",
    addEdge: "Beziehung hinzufügen",
    causal: "Kausal",
    contradiction: "Widerspruch",
    containment: "Enthalten",
    analogy: "Analogie",
    negation: "Negation"
  },
  pt: {
    title: "Plato System",
    nodePlaceholder: "Conceito (uma palavra)",
    addNode: "Adicionar nó",
    addEdge: "Adicionar relação",
    causal: "Causal",
    contradiction: "Contradição",
    containment: "Contenção",
    analogy: "Analogia",
    negation: "Negação"
  },
  ko: {
    title: "Plato System",
    nodePlaceholder: "개념 (한 단어)",
    addNode: "노드 추가",
    addEdge: "관계 추가",
    causal: "인과",
    contradiction: "모순",
    containment: "포함",
    analogy: "유비",
    negation: "부정"
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);
}

function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });

  document.documentElement.lang = lang;
}

// 初期言語
const savedLang = localStorage.getItem("lang") || "en";
applyLang(savedLang);


