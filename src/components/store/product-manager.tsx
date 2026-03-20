"use client";

import { ChangeEvent, useState } from "react";
import { CheckCircle2, ExternalLink, ImagePlus, Pencil, PlusCircle, Trash2 } from "lucide-react";
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
  oldPrice: "59.90",
  price: "39.90",
  category: "Cozinha Pratica",
  categorySlug: "cozinha-pratica",
  affiliateUrl: "https://shopee.com.br/",
  cta: "Ver Produto",
  badge: "Novo produto",
  discountLabel: "-20%",
  iconKey: "package",
  imageUrl: "",
};

const categoryOptions = [
  { label: "Cozinha Pratica", value: "cozinha-pratica" },
  { label: "Casa Organizada", value: "casa-organizada" },
  { label: "Banheiro e Limpeza", value: "banheiro-e-limpeza" },
  { label: "Utilidades do Dia a Dia", value: "utilidades-do-dia-a-dia" },
  { label: "Academia", value: "academia" },
  { label: "Ferramentas", value: "ferramentas" },
  { label: "Automotiva", value: "automotiva" },
];

const visualOptions = [
  { label: "Organizacao", value: "package" },
  { label: "Cozinha", value: "chef-hat" },
  { label: "Utensilios", value: "utensils" },
  { label: "Brilho", value: "sparkles" },
  { label: "Limpeza", value: "bubbles" },
  { label: "Agua", value: "droplets" },
  { label: "Protecao", value: "shield" },
];

export function ProductManager() {
  const { addProduct, customProducts, removeProduct, updateProduct } = useProductStore();
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingProductId(null);
    setImageFile(null);
    setRemoveCurrentImage(false);
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
    const promoPrice = Number(form.price);
    const oldPrice = Number(form.oldPrice);

    if (!form.affiliateUrl.includes("shopee")) {
      setErrorMessage("Use um link valido da Shopee para o produto.");
      return;
    }

    if (promoPrice <= 0 || oldPrice <= 0 || promoPrice > oldPrice) {
      setErrorMessage("Confira os precos: o promocional precisa ser maior que zero e menor ou igual ao preco antigo.");
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
      imageUrl: form.imageUrl || undefined,
      iconKey: form.iconKey as
        | "chef-hat"
        | "sparkles"
        | "package"
        | "droplets"
        | "utensils"
        | "shield"
        | "bubbles",
      accentFrom: "#FF6000",
      accentTo: "#E63946",
      benefits: [
        "Link pronto para redirecionar o cliente",
        "Ideal para divulgar na sua vitrine de afiliado",
        "Edite depois conforme sua campanha",
      ],
      isNew: true,
      isFavorite: true,
    };

    setIsSubmitting(true);

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, payload, imageFile, removeCurrentImage);
        resetForm();
        setSuccessMessage("Produto atualizado com sucesso.");
        return;
      }

      await addProduct(payload, imageFile);
      resetForm();
      setSuccessMessage("Produto adicionado com sucesso. O botao agora leva para o link da Shopee informado.");
    } catch {
      setErrorMessage("Nao foi possivel salvar o produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(product: Product) {
    setEditingProductId(product.id);
    setErrorMessage("");
    setSuccessMessage("");
    setForm({
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      oldPrice: String(product.oldPrice),
      price: String(product.price),
      category: product.category,
      categorySlug: product.categorySlug,
      affiliateUrl: product.affiliateUrl,
      cta: product.cta,
      badge: product.badge,
      discountLabel: product.discountLabel,
      iconKey: product.iconKey,
      imageUrl: product.imageUrl ?? "",
    });
    setImageFile(null);
    setRemoveCurrentImage(false);
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
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 backdrop-blur-md shadow-xl relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 h-40 w-40 bg-[var(--brand-primary)]/10 blur-[60px] rounded-full" />
        
        <div className="relative">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
            <PlusCircle size={16} />
            {editingProductId ? "Edição de Produto" : "Novo Cadastro"}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Nome Comercial</span>
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
                placeholder="Ex: Luminária Inteligente RGB"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Headline (Curta)</span>
              <input
                required
                value={form.shortDescription}
                onChange={(event) => updateField("shortDescription", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
                placeholder="Ex: Transforme seu quarto com um clique"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Descrição Detalhada</span>
              <textarea
                required
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                rows={4}
                className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
                placeholder="Descreva os principais benefícios..."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Preço Original (R$)</span>
              <input
                required
                type="number"
                step="0.01"
                value={form.oldPrice}
                onChange={(event) => updateField("oldPrice", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Preço com Desconto (R$)</span>
              <input
                required
                type="number"
                step="0.01"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Categoria</span>
              <select
                value={form.categorySlug}
                onChange={(event) => updateField("categorySlug", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0f172a]">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Visual do Ícone</span>
              <select
                value={form.iconKey}
                onChange={(event) => updateField("iconKey", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
              >
                {visualOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0f172a]">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Texto do Selo</span>
              <input
                value={form.badge}
                onChange={(event) => updateField("badge", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
                placeholder="Ex: Mais Vendido"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Porcentagem OFF</span>
              <input
                value={form.discountLabel}
                onChange={(event) => updateField("discountLabel", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
                placeholder="Ex: -30%"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Link de Afiliado (Ex: Shopee)</span>
              <input
                required
                type="url"
                value={form.affiliateUrl}
                onChange={(event) => updateField("affiliateUrl", event.target.value)}
                className="h-12 rounded-2xl border border-white/5 bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08] text-[var(--brand-secondary)] font-medium"
                placeholder="https://shope.ee/..."
              />
            </label>

            <div className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">Mídia do Produto</span>
              <div className="flex gap-4 items-start">
                <label className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/5 py-8 transition hover:bg-white/[0.08] hover:border-[var(--brand-primary)]/40 group/upload text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 transition-transform group-hover/upload:scale-110">
                    <ImagePlus size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[var(--brand-text)]">Escolher Imagem</p>
                    <p className="text-[10px] text-[var(--brand-muted)] uppercase tracking-widest">PNG, JPG ou WEBP</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>

                {form.imageUrl && (
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-white/10 group/preview">
                    <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover transition-transform group-hover/preview:scale-110" />
                    <button
                      type="button"
                      onClick={() => {
                        updateField("imageUrl", "");
                        setImageFile(null);
                        setRemoveCurrentImage(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover/preview:opacity-100 transition-opacity text-white font-bold text-[10px] uppercase tracking-widest"
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
              className="group relative flex h-14 min-w-[200px] flex-1 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[#7c3aed] text-base font-bold text-white shadow-xl shadow-purple-500/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              <PlusCircle size={20} className="relative z-10" />
              <span className="relative z-10">{isSubmitting ? "Gravando..." : editingProductId ? "Salvar Alterações" : "Publicar Produto"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            
            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-8 text-sm font-bold text-[var(--brand-text)] transition hover:bg-white/10"
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
        <div className="rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 backdrop-blur-md shadow-xl">
          <h2 className="text-xl font-bold tracking-tight text-[var(--brand-text)]">Guia de Redação</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 font-bold text-xs border border-orange-500/20">01</div>
              <p className="text-sm leading-relaxed text-[var(--brand-muted)]">Use títulos chamativos que foquem na solução do problema.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 font-bold text-xs border border-purple-500/20">02</div>
              <p className="text-sm leading-relaxed text-[var(--brand-muted)]">Verifique se o link da Shopee está correto para garantir seu comissionamento.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 font-bold text-xs border border-cyan-500/20">03</div>
              <p className="text-sm leading-relaxed text-[var(--brand-muted)]">Escolha imagens com fundo limpo para destacar o produto na vitrine.</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)]">Produtos na Vitrine</p>
              <span className="text-2xl font-black text-[var(--brand-primary)]">{customProducts.length}</span>
            </div>
            <Link
              href="/"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-4 text-xs font-bold uppercase tracking-widest text-[var(--brand-text)] transition hover:bg-white/10"
            >
              <ExternalLink size={14} />
              Minha Vitrine Ao Vivo
            </Link>
          </div>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {customProducts.length === 0 ? (
            <div className="rounded-[2.5rem] border border-dashed border-white/10 p-12 text-center">
              <p className="text-sm font-medium text-[var(--brand-muted)] italic">Nenhum produto cadastrado até o momento.</p>
            </div>
          ) : (
            customProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-[2rem] border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/[0.08] hover:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-[var(--brand-text)]">{product.name}</h3>
                    <p className="truncate text-[10px] font-medium text-[var(--brand-muted)] uppercase tracking-wider">{product.category}</p>
                    <p className="mt-1 truncate text-xs font-bold text-[var(--brand-primary)]">{currency.format(product.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--brand-text)] transition hover:bg-white/10 group-hover:scale-110"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500/20 group-hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
