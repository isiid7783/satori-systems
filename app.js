const I18N = {
  ja: {
    title: "Relation Engine",
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
    title: "Relation Engine",
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
    title: "Motor de Relaciones",
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
    title: "关系引擎",
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
    title: "關係引擎",
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
    title: "Moteur de relations",
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
    title: "Beziehungs-Engine",
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
    title: "Motor de Relações",
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
    title: "관계 엔진",
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

