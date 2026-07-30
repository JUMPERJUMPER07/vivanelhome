"use client";

import { ChangeEvent, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Plus,
  Save,
  Search,
  Trash2,
  Wand2,
  X,
  CheckCircle2, ExternalLink, ImagePlus, Pencil, PlusCircle
} from "lucide-react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useProductStore } from "./product-store-provider";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const initialForm = {
  name: "",
  shortDescription: "",
  description: "",
  oldPrice: "",
  price: "",
  category: "Cozinha Pratica",
  categorySlug: "cozinha-pratica",
  affiliateUrl: "https://shopee.com.br/",
  cta: "Ver Produto",
  badge: "Novo",
  discountLabel: "",
  rating: "5.0",
  reviewCount: "1",
  soldLabel: "4mil+ Vendidos",
  iconKey: "package",
  imageUrl: "",
};

const categoryOptions = [
  { label: "Cozinha Prática", value: "cozinha-pratica" },
  { label: "Casa Organizada", value: "casa-organizada" },
  { label: "Banheiro e Limpeza", value: "banheiro-e-limpeza" },
  { label: "Eletro", value: "eletro" },
  { label: "Eletrônico", value: "eletronicos" },
  { label: "Saúde", value: "saude" },
  { label: "Beleza", value: "beleza" },
  { label: "Infantil", value: "infantil" },
  { label: "Pet", value: "pet" },
  { label: "Academia", value: "academia" },
  { label: "Ferramentas", value: "ferramentas" },
  { label: "Automotiva", value: "automotiva" },
  { label: "Informática", value: "informatica" },
];

const storeOptions = [
  { label: "Shopee", value: "shopee" },
  { label: "Amazon", value: "amazon" },
  { label: "Mercado Livre", value: "mercado-livre" },
];


export function ProductManager() {
  const { addProduct, allProducts, customProducts, removeProduct, updateProduct } = useProductStore();
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScraping, setIsScraping] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => {
      const updated = { ...current, [field]: value };
      
      // Auto-set categorySlug if category name matches
      if (field === "category") {
        const option = categoryOptions.find(o => o.label === value);
        if (option) updated.categorySlug = option.value;
      }
      
      return updated;
    });
  }

  function resetForm() {
    setForm(initialForm);
    setEditingProductId(null);
    setImageFile(null);
    setRemoveCurrentImage(false);
  }

  async function handleScrape() {
    if (!form.affiliateUrl || !form.affiliateUrl.startsWith("http")) {
      setErrorMessage("Insira um link válido para buscar os dados.");
      return;
    }

    setIsScraping(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.affiliateUrl }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Erro ao buscar dados.");
      // Atualiza os campos se encontrar dados
      console.log("Scraped data:", data);
      
      const cleanPrice = data.price 
        ? String(data.price).replace(/[^\d.,]/g, "").replace(".", ",") 
        : "";

      setForm(prev => ({
        ...prev,
        name: data.title || prev.name,
        description: (data.description || prev.description || "").substring(0, 3000),
        imageUrl: data.image || prev.imageUrl,
        price: cleanPrice || prev.price,
        shortDescription: data.title ? (data.title.substring(0, 120)) : prev.shortDescription,
      }));

      setSuccessMessage("Dados capturados com sucesso! Revise os campos preenchidos.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível puxar os dados automaticamente.");
    } finally {
      setIsScraping(false);
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      updateField("imageUrl", result);
      setImageFile(file);
      setRemoveCurrentImage(false);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const selectedCategory = categoryOptions.find((item) => item.value === form.categorySlug);
    const sanitize = (val: string) => {
      if (!val) return 0;
      let clean = String(val).trim();
      const lastDot = clean.lastIndexOf(".");
      const lastComma = clean.lastIndexOf(",");
      
      if (lastComma > lastDot) {
        clean = clean.replace(/\./g, "");
        const parts = clean.split(",");
        const dec = parts.pop();
        clean = parts.join("") + "." + dec;
      } else if (lastDot > lastComma) {
        clean = clean.replace(/,/g, "");
      }
      return Number(clean) || 0;
    };
    const promoPrice = sanitize(form.price);
    const oldPrice = sanitize(form.oldPrice);

    const url = form.affiliateUrl.toLowerCase();
    const isAcceptedLink = 
      url.includes("shopee") || 
      url.includes("shope.ee") ||
      url.includes("amazon") ||
      url.includes("amzn") ||
      url.includes("mercadolivre") ||
      url.includes("meli.li") ||
      url.includes("meli.la");

    if (!isAcceptedLink) {
      setErrorMessage("Use um link válido da Shopee, Amazon ou Mercado Livre para o produto.");
      return;
    }

    if (promoPrice <= 0 || (oldPrice > 0 && promoPrice > oldPrice)) {
      setErrorMessage("Confira os precos: o promocional precisa ser maior que zero. Se o preço antigo for preenchido, deve ser maior que o promocional.");
      return;
    }

    const payload = {
      name: form.name,
      shortDescription: form.shortDescription,
      description: form.description,
      oldPrice,
      price: promoPrice,
      discountLabel: form.discountLabel,
      category: selectedCategory?.label ?? form.category,
      categorySlug: form.categorySlug,
      affiliateUrl: form.affiliateUrl,
      cta: form.cta,
      badge: form.badge,
      iconKey: form.iconKey as
        | "chef-hat"
        | "sparkles"
        | "package"
        | "droplets"
        | "utensils"
        | "shield"
        | "bubbles"
        | "heart"
        | "flower-2"
        | "monitor"
        | "smartphone"
        | "tv"
        | "baby"
        | "paw"
        | "store"
        | "globe",
      accentFrom: "#FF6000",
      accentTo: "#E63946",
      imageUrl: form.imageUrl || undefined,
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount),
      soldLabel: form.soldLabel,
      benefits: [],
      isNew: true,
      isFavorite: true,
    };

    setIsSubmitting(true);

    try {
      if (editingProductId && String(editingProductId).length > 5) {
        // High IDs (> 5 chars) are likely DB IDs in this context or UUIDs
        await updateProduct(editingProductId, payload, imageFile, removeCurrentImage);
        resetForm();
        setSuccessMessage("Produto atualizado com sucesso.");
        return;
      }

      // If it's a sample (small ID) or a brand new one, we ADD a new record
      await addProduct(payload, imageFile);
      resetForm();
      setSuccessMessage("Produto 'Amostra' agora e um produto REAL na sua vitrine!");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Nao foi possivel salvar o produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(product: Product) {
    // Only set ID if it's a real DB product (usually large numbers)
    // For samples, we leave editingProductId as null so it triggers "addProduct" on submit
    setEditingProductId(product.isCustom ? product.id : null);
    setErrorMessage("");
    setSuccessMessage("");
    setForm({
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      oldPrice: product.oldPrice > 0 ? String(product.oldPrice).replace(".", ",") : "",
      price: String(product.price).replace(".", ","),
      category: product.category,
      categorySlug: product.categorySlug,
      affiliateUrl: product.affiliateUrl,
      cta: product.cta,
      badge: product.badge,
      discountLabel: product.discountLabel,
      iconKey: product.iconKey,
      imageUrl: product.imageUrl ?? "",
      rating: String(product.rating),
      reviewCount: String(product.reviewCount),
      soldLabel: product.soldLabel || "",
    });
    setImageFile(null);
    setRemoveCurrentImage(false);
    
    // Improved scrolling to capture the form's attention
    const formElement = document.getElementById("product-form-top");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleDelete(productId: number) {
    try {
      await removeProduct(productId);
      if (editingProductId === productId) {
        resetForm();
      }
      setSuccessMessage("Produto removido com sucesso.");
    } catch {
      setErrorMessage("Nao foi possivel remover o produto.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <form
        id="product-form-top"
        onSubmit={handleSubmit}
        className={`rounded-[2.5rem] border transition-all duration-500 bg-purple-950/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(109,40,217,0.08)] relative overflow-hidden ${
          editingProductId || form.name
            ? "border-purple-500 shadow-[0_0_40px_rgba(109,40,217,0.2)] ring-2 ring-purple-500/20" 
            : "border-purple-500/15"
        }`}
      >
        <div className={`absolute -top-10 -left-10 h-40 w-40 blur-[60px] rounded-full transition-colors duration-500 ${
          editingProductId ? "bg-purple-600/30" : "bg-purple-600/10"
        }`} />
        
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
              {editingProductId ? <Pencil size={16} /> : <PlusCircle size={16} />}
              {editingProductId ? "Modo de Edição Ativo" : "Novo Cadastro de Produto"}
            </div>
            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20"
              >
                Cancelar Edição
              </button>
            )}
          </div>

          {editingProductId && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <h1 className="text-2xl font-black text-white line-clamp-1">
                <span className="text-purple-400">Editando:</span> {form.name}
              </h1>
              <p className="text-xs text-white/60 font-medium mt-1">
                Altere os campos abaixo e clique em "Salvar Alterações" para aplicar.
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Nome Comercial</span>
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: Luminária Inteligente RGB"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Headline (Curta)</span>
              <input
                required
                value={form.shortDescription}
                onChange={(event) => updateField("shortDescription", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: Transforme seu quarto com um clique"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Descrição Detalhada</span>
              <textarea
                required
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                rows={4}
                maxLength={3000}
                className="rounded-2xl border border-purple-500/20 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Descreva os principais benefícios... (Até 3000 caracteres)"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Preço Original / Sem Desconto (Opcional)</span>
              <input
                type="text"
                inputMode="decimal"
                value={form.oldPrice}
                onChange={(event) => updateField("oldPrice", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: 59,90"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Preço Atual / Real (R$)</span>
              <input
                required
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: 39,90"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Avaliação (0 a 5.0)</span>
              <input
                type="text"
                inputMode="decimal"
                value={form.rating}
                onChange={(event) => updateField("rating", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: 4,9"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Qtd de Avaliações</span>
              <input
                type="number"
                min="0"
                value={form.reviewCount}
                onChange={(event) => updateField("reviewCount", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Vendas (Ex: 4mil+ Vendidos)</span>
              <input
                value={form.soldLabel}
                onChange={(event) => updateField("soldLabel", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: 4mil+ Vendidos"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Categoria</span>
              <select
                value={form.categorySlug}
                onChange={(event) => updateField("categorySlug", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-[#0c0a13] px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0c0a13] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Loja / Marketplace</span>
              <select
                value={form.iconKey}
                onChange={(event) => updateField("iconKey", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-[#0c0a13] px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                {storeOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0c0a13] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Texto do Selo</span>
              <input
                value={form.badge}
                onChange={(event) => updateField("badge", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: Mais Vendido"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Porcentagem OFF (Opcional)</span>
              <input
                value={form.discountLabel}
                onChange={(event) => updateField("discountLabel", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
                placeholder="Ex: -30% (Pode deixar em branco)"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <div className="flex items-center justify-between ml-1">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Link de Afiliado (Shopee, ML ou Amazon)</span>
                <button
                  type="button"
                  onClick={handleScrape}
                  disabled={isScraping || !form.affiliateUrl}
                  className="flex items-center gap-2 rounded-lg bg-purple-600/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-purple-300 transition hover:bg-purple-600/30 disabled:opacity-30 border border-purple-500/30"
                >
                  {isScraping ? (
                    <>Buscando...</>
                  ) : (
                    <>
                      <Wand2 size={12} />
                      Puxar Dados Automático
                    </>
                  )}
                </button>
              </div>
              <input
                required
                type="url"
                value={form.affiliateUrl}
                onChange={(event) => updateField("affiliateUrl", event.target.value)}
                className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-purple-300 outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 font-medium placeholder:text-white/30"
                placeholder="https://shope.ee/..."
              />
            </label>

            <div className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 ml-1">Mídia do Produto</span>
              <div className="flex gap-4 items-start">
                <label className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-500/20 bg-black/40 py-8 transition hover:bg-purple-950/20 hover:border-purple-500/40 group/upload text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 transition-transform group-hover/upload:scale-110">
                    <ImagePlus size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Escolher Imagem</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">PNG, JPG ou WEBP</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>

                {form.imageUrl && (
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-purple-500/20 group/preview">
                    <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover transition-transform group-hover/preview:scale-110" />
                    <button
                      type="button"
                      onClick={() => {
                        updateField("imageUrl", "");
                        setImageFile(null);
                        setRemoveCurrentImage(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-red-600/90 opacity-0 group-hover/preview:opacity-100 transition-opacity text-white font-black text-[10px] uppercase tracking-widest"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex h-14 min-w-[200px] flex-1 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-base font-black text-white shadow-[0_0_25px_rgba(109,40,217,0.4)] transition-all hover:from-purple-600 hover:to-indigo-600 active:scale-[0.98] disabled:opacity-50"
            >
              {editingProductId ? <Pencil size={20} className="relative z-10" /> : <PlusCircle size={20} className="relative z-10" />}
              <span className="relative z-10">{isSubmitting ? "Gravando..." : editingProductId ? "Salvar Alterações" : "Publicar Produto"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            
            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-8 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Descartar Edição
              </button>
            )}
          </div>

          {(successMessage || errorMessage) && (
            <div className={`mt-6 rounded-2xl p-4 text-center text-sm font-bold ${
              successMessage ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}>
              {successMessage || errorMessage}
            </div>
          )}
        </div>
      </form>

      <div className="space-y-8">
        <div className="rounded-[2.5rem] border border-purple-500/15 bg-purple-950/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(109,40,217,0.08)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <h2 className="text-xl font-black tracking-tight text-white drop-shadow-sm">Guia de Redação</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-purple-500/15">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 font-bold text-xs border border-orange-500/20">01</div>
              <p className="text-xs leading-relaxed text-white/70">Use títulos chamativos que foquem na solução do problema.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-purple-500/15">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/20">02</div>
              <p className="text-xs leading-relaxed text-white/70">Verifique se o link da Shopee/Amazon/ML está correto para garantir seu comissionamento.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-purple-500/15">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/20">03</div>
              <p className="text-xs leading-relaxed text-white/70">Escolha imagens com fundo limpo para destacar o produto na vitrine.</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Produtos na Vitrine</p>
              <span className="text-2xl font-black text-purple-400">{customProducts.length}</span>
            </div>
            <Link
              href="/"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-950/40 p-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-purple-900/50 hover:border-purple-500/40"
            >
              <ExternalLink size={14} />
              Minha Vitrine Ao Vivo
            </Link>
          </div>
        </div>

        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {allProducts.length === 0 ? (
            <div className="rounded-[2.5rem] border border-dashed border-white/10 p-12 text-center">
              <p className="text-sm font-medium text-white/50 italic">Nenhum produto cadastrado até o momento.</p>
            </div>
          ) : (
            allProducts.map((product) => (
              <div
                key={`${product.isCustom ? 'c' : 's'}-${product.id}`}
                className={`group rounded-[2rem] border transition-all p-5 border-purple-500/15 ${
                  product.isCustom ? 'bg-purple-950/30 border-purple-500/30' : 'bg-black/30 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 relative">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    {product.isCustom ? (
                       <span className="absolute bottom-0 right-0 bg-purple-600 text-[8px] font-black px-1.5 py-0.5 text-white uppercase rounded-tl-lg shadow-lg">Real</span>
                    ) : (
                       <span className="absolute bottom-0 right-0 bg-white/20 text-[6px] font-black px-1.5 py-0.5 text-white uppercase rounded-tl-lg backdrop-blur-sm">Amostra</span>
                    )}
                  </div>
                   <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white">{product.name}</h3>
                    <div className="flex items-center gap-2">
                       <p className="truncate text-[9px] font-black text-purple-400 uppercase tracking-wider">{product.iconKey}</p>
                       <span className="h-1 w-1 bg-white/20 rounded-full" />
                       <p className="truncate text-[9px] font-medium text-white/50 uppercase tracking-wider">{product.category}</p>
                       {product.isCustom && <div className="h-1 w-1 bg-purple-400 rounded-full animate-pulse" />}
                    </div>
                    <p className="mt-1 truncate text-xs font-bold text-purple-300">{currency.format(product.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white group-hover:scale-110"
                      title={product.isCustom ? "Editar Produto" : "Transformar em Real"}
                    >
                      <Pencil size={18} />
                    </button>
                    {product.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition hover:bg-red-500/20 group-hover:scale-110"
                        title="Excluir Produto"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
