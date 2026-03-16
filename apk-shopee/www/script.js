/*
  ========================================
  CONFIGURACOES RAPIDAS (PADRAO DO SITE)
  ========================================
  O site agora carrega primeiro os dados salvos em localStorage
  pela pagina editor.html. Se nao existir nada salvo, usa estes
  dados padrao abaixo.
*/
const STORAGE_KEY = "affiliateLandingDataV1";

const DEFAULT_STORE = {
  name: "Achadinhos Virais BR",
  badge: "AV",
  whatsapp: "5500000000000",
  whatsappMessage: "Oi! Quero receber os achadinhos virais do dia"
};

const OFFER_DURATION_HOURS = 48;

const DEFAULT_CATEGORIES = [
  "Viral do TikTok",
  "Utilidades",
  "Beleza",
  "Eletrônicos",
  "Casa",
  "Moda"
];

const DEFAULT_PRODUCTS = [
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
];

function loadLandingData() {
  const fallback = {
    store: { ...DEFAULT_STORE },
    categories: [...DEFAULT_CATEGORIES],
    products: [...DEFAULT_PRODUCTS]
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);

    const store = { ...DEFAULT_STORE, ...(parsed.store || {}) };
    const products = Array.isArray(parsed.products) && parsed.products.length ? parsed.products : fallback.products;

    let categories = Array.isArray(parsed.categories) ? parsed.categories.filter(Boolean) : [];
    if (!categories.length) {
      categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
    }
    if (!categories.length) {
      categories = [...fallback.categories];
    }

    return { store, categories, products };
  } catch {
    return fallback;
  }
}

const DATA = loadLandingData();
const STORE = DATA.store;
const BASE_CATEGORIES = DATA.categories;
const PRODUCTS = DATA.products;
const CATEGORIES = ["Todos", ...BASE_CATEGORIES];

const categoryButtons = document.getElementById("categoryButtons");
const productsGrid = document.getElementById("productsGrid");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const trendingList = document.getElementById("trendingList");
const flashList = document.getElementById("flashList");

let activeCategory = "Todos";
let searchTerm = "";
let sortMode = "relevance";

const promoEnd = new Date(Date.now() + OFFER_DURATION_HOURS * 60 * 60 * 1000);

const currency = (value) => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatSold = (amount) => `+${(Number(amount) / 1000).toFixed(1).replace(".", ",")} mil vendidos`;
const discountPercent = (product) => Math.round(((Number(product.oldPrice) - Number(product.currentPrice)) / Number(product.oldPrice)) * 100);

function setupStoreData() {
  document.getElementById("storeNameHeader").textContent = STORE.name;
  document.getElementById("storeNameFooter").textContent = STORE.name;
  document.getElementById("storeBadge").textContent = STORE.badge;
  document.getElementById("opportunitiesCount").textContent = PRODUCTS.length;

  const whatsappHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(STORE.whatsappMessage)}`;
  document.getElementById("whatsappBtn").href = whatsappHref;
}

function renderCategories() {
  categoryButtons.innerHTML = "";

  CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.className = `cat-btn${category === activeCategory ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderProducts();
    });
    categoryButtons.appendChild(button);
  });
}

function getFilteredProducts() {
  const filtered = PRODUCTS.filter((product) => {
    const categoryMatch = activeCategory === "Todos" || product.category === activeCategory;
    const searchMatch = String(product.name).toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (sortMode === "lowest") filtered.sort((a, b) => Number(a.currentPrice) - Number(b.currentPrice));
  if (sortMode === "highestDiscount") filtered.sort((a, b) => discountPercent(b) - discountPercent(a));
  if (sortMode === "rating") filtered.sort((a, b) => Number(b.rating) - Number(a.rating));

  return filtered;
}

function renderProducts() {
  const products = getFilteredProducts();
  resultsCount.textContent = `${products.length} produto${products.length === 1 ? "" : "s"}`;
  productsGrid.innerHTML = "";

  if (!products.length) {
    productsGrid.innerHTML = '<div class="empty-state">Nenhum resultado encontrado. Tente outro nome ou categoria.</div>';
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-media-wrap">
        <img class="product-media" src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-badge">${product.tag}</span>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <div class="price-row">
          <span class="price-new">${currency(product.currentPrice)}</span>
          <span class="price-old">${currency(product.oldPrice)}</span>
          <span class="discount">-${discountPercent(product)}%</span>
        </div>
        <p class="meta">⭐ ${Number(product.rating).toFixed(1)} • ${formatSold(product.sold)}</p>
        <a class="buy-btn" href="${product.link}" target="_blank" rel="noopener noreferrer">Comprar agora</a>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

function renderBombando() {
  const trending = [...PRODUCTS].sort((a, b) => Number(b.sold) - Number(a.sold)).slice(0, 5);
  trendingList.innerHTML = "";
  trending.forEach((product) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${product.name}</span><strong>${currency(product.currentPrice)}</strong>`;
    trendingList.appendChild(item);
  });

  const flash = [...PRODUCTS].sort((a, b) => discountPercent(b) - discountPercent(a)).slice(0, 3);
  flashList.innerHTML = "";
  flash.forEach((product) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${product.name}</span><strong>-${discountPercent(product)}%</strong>`;
    flashList.appendChild(item);
  });
}

function updateCountdown() {
  const now = new Date();
  const diff = promoEnd - now;

  const values = { days: "00", hours: "00", minutes: "00", seconds: "00" };

  if (diff > 0) {
    values.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
    values.hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    values.minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    values.seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  }

  document.getElementById("days").textContent = values.days;
  document.getElementById("hours").textContent = values.hours;
  document.getElementById("minutes").textContent = values.minutes;
  document.getElementById("seconds").textContent = values.seconds;
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    renderProducts();
  });

  sortSelect.addEventListener("change", (event) => {
    sortMode = event.target.value;
    renderProducts();
  });

  document.getElementById("scrollOffersBtn").addEventListener("click", () => {
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("menuRow").classList.toggle("open");
  });
}

function init() {
  setupStoreData();
  renderCategories();
  renderProducts();
  renderBombando();
  bindEvents();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

init();
