const STORAGE_KEY = "affiliateLandingDataV1";

const defaults = {
  store: {
    name: "Achadinhos Virais BR",
    badge: "AV",
    whatsapp: "5500000000000",
    whatsappMessage: "Oi! Quero receber os achadinhos virais do dia"
  },
  categories: ["Viral do TikTok", "Utilidades", "Beleza", "Eletrônicos", "Casa", "Moda"],
  products: [
    { id: 1, category: "Viral do TikTok", tag: "Viral", name: "Mini seladora portátil para pacotes", currentPrice: 24.9, oldPrice: 49.9, rating: 4.8, sold: 8300, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-1" },
    { id: 2, category: "Utilidades", tag: "Tendência", name: "Organizador de cabos magnético (kit com 6)", currentPrice: 18.9, oldPrice: 37.9, rating: 4.7, sold: 5400, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-2" },
    { id: 3, category: "Beleza", tag: "Explodindo em vendas", name: "Escova secadora 3 em 1 bivolt", currentPrice: 79.9, oldPrice: 159.9, rating: 4.9, sold: 12700, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-3" },
    { id: 4, category: "Eletrônicos", tag: "Viral", name: "Ring light 26cm com tripé ajustável", currentPrice: 45.9, oldPrice: 89.9, rating: 4.8, sold: 9200, image: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-4" },
    { id: 5, category: "Casa", tag: "Tendência", name: "Lâmpada LED com sensor de presença", currentPrice: 29.9, oldPrice: 59.9, rating: 4.7, sold: 6800, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-5" },
    { id: 6, category: "Moda", tag: "Explodindo em vendas", name: "Óculos retrô UV400 unissex", currentPrice: 22.9, oldPrice: 45.9, rating: 4.6, sold: 4500, image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-6" },
    { id: 7, category: "Viral do TikTok", tag: "Viral", name: "Mini liquidificador portátil USB", currentPrice: 54.9, oldPrice: 109.9, rating: 4.8, sold: 10100, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-7" },
    { id: 8, category: "Utilidades", tag: "Tendência", name: "Escova removedora de pelos para pet", currentPrice: 27.9, oldPrice: 55.9, rating: 4.7, sold: 7100, image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-8" },
    { id: 9, category: "Beleza", tag: "Explodindo em vendas", name: "Máscara facial LED recarregável", currentPrice: 69.9, oldPrice: 139.9, rating: 4.6, sold: 3900, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-9" },
    { id: 10, category: "Eletrônicos", tag: "Viral", name: "Fone bluetooth gamer baixa latência", currentPrice: 63.9, oldPrice: 129.9, rating: 4.8, sold: 11200, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-10" },
    { id: 11, category: "Casa", tag: "Tendência", name: "Aspirador de mão portátil sem fio", currentPrice: 72.9, oldPrice: 149.9, rating: 4.7, sold: 5200, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-11" },
    { id: 12, category: "Moda", tag: "Explodindo em vendas", name: "Bolsa transversal minimalista feminina", currentPrice: 39.9, oldPrice: 79.9, rating: 4.8, sold: 6400, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80", link: "https://shopee.com.br/afiliado-produto-12" }
  ]
};

const $ = (id) => document.getElementById(id);
const state = loadState();
let editingId = null;

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaults);

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.products)) return structuredClone(defaults);
    return {
      store: { ...defaults.store, ...(parsed.store || {}) },
      categories: Array.isArray(parsed.categories) ? parsed.categories : structuredClone(defaults.categories),
      products: parsed.products
    };
  } catch {
    return structuredClone(defaults);
  }
}

function renderStore() {
  $("storeName").value = state.store.name || "";
  $("storeBadge").value = state.store.badge || "";
  $("storeWhatsapp").value = state.store.whatsapp || "";
  $("storeMessage").value = state.store.whatsappMessage || "";
  $("categoriesInput").value = state.categories.join(", ");
}

function clearForm() {
  ["pName", "pCategory", "pTag", "pImage", "pLink", "pCurrent", "pOld", "pRating", "pSold"].forEach((id) => {
    $(id).value = "";
  });
}

function productFromForm() {
  return {
    id: editingId || Date.now(),
    name: $("pName").value.trim(),
    category: $("pCategory").value.trim(),
    tag: $("pTag").value.trim() || "Viral",
    image: $("pImage").value.trim(),
    link: $("pLink").value.trim(),
    currentPrice: Number($("pCurrent").value),
    oldPrice: Number($("pOld").value),
    rating: Number($("pRating").value),
    sold: Number($("pSold").value)
  };
}

function validateProduct(product) {
  if (!product.name || !product.category || !product.image || !product.link) {
    setStatus("Preencha nome, categoria, imagem e link.", true);
    return false;
  }
  if (Number.isNaN(product.currentPrice) || Number.isNaN(product.oldPrice) || Number.isNaN(product.rating) || Number.isNaN(product.sold)) {
    setStatus("Preços, avaliação e vendas precisam ser numéricos.", true);
    return false;
  }
  if (product.rating < 0 || product.rating > 5) {
    setStatus("Avaliação deve ficar entre 0 e 5.", true);
    return false;
  }
  return true;
}

function setStatus(message, isError = false) {
  const el = $("status");
  el.textContent = message;
  el.style.color = isError ? "#b42318" : "#146c2e";
}

function renderProducts() {
  const list = $("productsList");
  list.innerHTML = "";

  if (!state.products.length) {
    list.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  state.products.forEach((product) => {
    const row = document.createElement("div");
    row.className = "product-item";
    row.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <small>${product.category} • ${product.tag} • R$ ${Number(product.currentPrice).toFixed(2)}</small>
      </div>
      <div class="actions-row">
        <button class="btn" data-edit="${product.id}">Editar</button>
        <button class="btn danger" data-remove="${product.id}">Excluir</button>
      </div>
    `;
    list.appendChild(row);
  });
}

function fillFormForEdit(id) {
  const product = state.products.find((p) => p.id === id);
  if (!product) return;

  editingId = id;
  $("pName").value = product.name;
  $("pCategory").value = product.category;
  $("pTag").value = product.tag;
  $("pImage").value = product.image;
  $("pLink").value = product.link;
  $("pCurrent").value = product.currentPrice;
  $("pOld").value = product.oldPrice;
  $("pRating").value = product.rating;
  $("pSold").value = product.sold;

  $("addProductBtn").disabled = true;
  $("updateProductBtn").disabled = false;
  $("cancelEditBtn").disabled = false;
  setStatus("Editando produto. Clique em 'Salvar edição'.");
}

function cancelEdit() {
  editingId = null;
  clearForm();
  $("addProductBtn").disabled = false;
  $("updateProductBtn").disabled = true;
  $("cancelEditBtn").disabled = true;
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function syncStoreFromInputs() {
  state.store.name = $("storeName").value.trim();
  state.store.badge = $("storeBadge").value.trim();
  state.store.whatsapp = $("storeWhatsapp").value.trim();
  state.store.whatsappMessage = $("storeMessage").value.trim();

  const categories = $("categoriesInput").value
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  state.categories = categories;
}

function bindEvents() {
  $("addProductBtn").addEventListener("click", () => {
    const product = productFromForm();
    if (!validateProduct(product)) return;
    state.products.push(product);
    renderProducts();
    clearForm();
    setStatus("Produto adicionado. Não esqueça de clicar em 'Salvar alterações'.");
  });

  $("updateProductBtn").addEventListener("click", () => {
    const updated = productFromForm();
    if (!validateProduct(updated)) return;

    const index = state.products.findIndex((p) => p.id === editingId);
    if (index >= 0) {
      state.products[index] = updated;
      renderProducts();
      cancelEdit();
      setStatus("Produto atualizado.");
    }
  });

  $("cancelEditBtn").addEventListener("click", cancelEdit);

  $("productsList").addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.dataset.edit) fillFormForEdit(Number(target.dataset.edit));

    if (target.dataset.remove) {
      const id = Number(target.dataset.remove);
      state.products = state.products.filter((p) => p.id !== id);
      renderProducts();
      setStatus("Produto removido. Salve para aplicar na landing.");
    }
  });

  $("saveBtn").addEventListener("click", () => {
    syncStoreFromInputs();
    saveToLocalStorage();
    setStatus("Alterações salvas com sucesso. Atualize a landing para ver.");
  });

  $("exportBtn").addEventListener("click", () => {
    syncStoreFromInputs();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landing-afiliados-dados.json";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("JSON exportado.");
  });

  $("resetBtn").addEventListener("click", () => {
    const ok = confirm("Tem certeza que deseja restaurar os dados padrão?");
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
}

renderStore();
renderProducts();
bindEvents();
