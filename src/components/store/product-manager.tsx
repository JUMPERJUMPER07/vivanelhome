"use client";

import { ChangeEvent, useState } from "react";
import { CheckCircle2, ExternalLink, ImagePlus, Pencil, PlusCircle, Trash2 } from "lucide-react";
import type { Product } from "@/data/products";
import { useProductStore } from "./product-store-provider";

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
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
      >
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
          <PlusCircle size={18} />
          {editingProductId ? "Editar produto" : "Cadastrar produto"}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)] md:col-span-2">
            Nome do produto
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)] md:col-span-2">
            Descricao curta
            <input
              required
              value={form.shortDescription}
              onChange={(event) => updateField("shortDescription", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)] md:col-span-2">
            Descricao completa
            <textarea
              required
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              rows={4}
              className="rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 py-3 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Preco antigo
            <input
              required
              type="number"
              step="0.01"
              value={form.oldPrice}
              onChange={(event) => updateField("oldPrice", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Preco promocional
            <input
              required
              type="number"
              step="0.01"
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Categoria
            <select
              value={form.categorySlug}
              onChange={(event) => updateField("categorySlug", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Visual do card
            <select
              value={form.iconKey}
              onChange={(event) => updateField("iconKey", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            >
              {visualOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Selo
            <input
              value={form.badge}
              onChange={(event) => updateField("badge", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Desconto
            <input
              value={form.discountLabel}
              onChange={(event) => updateField("discountLabel", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Texto do botao
            <input
              value={form.cta}
              onChange={(event) => updateField("cta", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)] md:col-span-2">
            Link da Shopee
            <input
              required
              type="url"
              value={form.affiliateUrl}
              onChange={(event) => updateField("affiliateUrl", event.target.value)}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            />
          </label>

          <div className="grid gap-2 text-sm font-semibold text-[var(--brand-text)] md:col-span-2">
            <span>Foto do produto</span>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[1.5rem] border border-dashed border-[var(--brand-orange)]/25 bg-[var(--brand-light)] px-4 py-5 text-sm font-bold text-[var(--brand-orange)] transition hover:border-[var(--brand-orange)]">
              <ImagePlus size={18} />
              Escolher foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs font-medium text-[var(--brand-muted)]">
              A imagem enviada sera usada no campo <code className="rounded bg-white px-1 py-0.5">imageUrl</code> do produto e aparecera no card da vitrine.
            </p>
            {form.imageUrl ? (
              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--brand-orange)]/10 bg-[var(--brand-light)] p-3">
                <img
                  src={form.imageUrl}
                  alt="Preview do produto"
                  className="h-48 w-full rounded-[1rem] object-cover"
                />
              </div>
            ) : null}
            {form.imageUrl ? (
              <button
                type="button"
                onClick={() => {
                  updateField("imageUrl", "");
                  setImageFile(null);
                  setRemoveCurrentImage(true);
                }}
                className="justify-self-start rounded-full border border-[#fecdd3] bg-white px-4 py-2 text-xs font-bold text-[#be123c]"
              >
                Remover foto atual
              </button>
            ) : null}
            <p className="text-xs font-medium text-[var(--brand-muted)]">
              Persistencia real: os dados ficam em <code className="rounded bg-white px-1 py-0.5">storage/custom-products.json</code> e a foto enviada vai para <code className="rounded bg-white px-1 py-0.5">public/uploads/products</code>.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF6000,#E63946)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(230,57,70,0.18)]"
          >
            <PlusCircle size={16} />
            {isSubmitting ? "Salvando..." : editingProductId ? "Atualizar produto" : "Salvar produto"}
          </button>
          {editingProductId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-[var(--brand-orange)]/15 px-5 py-3 text-sm font-bold text-[var(--brand-text)]"
            >
              Cancelar edicao
            </button>
          ) : null}
        </div>

        {successMessage ? (
          <div className="mt-4 flex items-start gap-2 rounded-[1.5rem] bg-[#ecfdf3] px-4 py-3 text-sm font-semibold text-[#166534]">
            <CheckCircle2 size={18} className="mt-0.5" />
            <span>{successMessage}</span>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="mt-4 rounded-[1.5rem] bg-[#fff1f2] px-4 py-3 text-sm font-semibold text-[#be123c]">
            {errorMessage}
          </div>
        ) : null}
      </form>

      <div className="rounded-[2rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <h2 className="text-xl font-black text-[var(--brand-text)]">Como funciona</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
          Sempre que voce cadastrar um produto com o link da Shopee, ele aparecera na vitrine personalizada da home e o CTA do card abrira exatamente a URL informada.
        </p>

        <div className="mt-5 space-y-4">
          <div className="rounded-[1.5rem] bg-[var(--brand-light)] p-4">
            <p className="text-sm font-bold text-[var(--brand-text)]">1. Cadastre o produto</p>
            <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
              Preencha nome, preco, categoria e o link final do produto na Shopee.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-[var(--brand-light)] p-4">
            <p className="text-sm font-bold text-[var(--brand-text)]">2. Produto entra na vitrine</p>
            <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
              O item fica salvo no servidor local do projeto e aparece automaticamente na home.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-[var(--brand-light)] p-4">
            <p className="text-sm font-bold text-[var(--brand-text)]">3. Cliente clica no botao</p>
            <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
              O clique no botao abre o link cadastrado, ideal para seu link de afiliado da Shopee.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-dashed border-[var(--brand-orange)]/20 bg-[var(--brand-light)] p-4">
          <p className="text-sm font-semibold text-[var(--brand-text)]">Produtos cadastrados no sistema</p>
          <p className="mt-2 text-3xl font-black text-[var(--brand-red)]">{customProducts.length}</p>
          <a
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-orange)]"
          >
            <ExternalLink size={16} />
            Ver vitrine
          </a>
        </div>

        <div className="mt-6 space-y-3">
          {customProducts.length === 0 ? (
            <div className="rounded-[1.5rem] bg-[var(--brand-light)] p-4 text-sm leading-6 text-[var(--brand-muted)]">
              Nenhum produto cadastrado ainda. Assim que voce salvar o primeiro, ele aparecera aqui para edicao e exclusao.
            </div>
          ) : (
            customProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-[1.5rem] border border-[var(--brand-orange)]/10 bg-[var(--brand-light)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[var(--brand-text)]">{product.name}</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--brand-muted)]">{product.shortDescription}</p>
                    <p className="mt-2 text-xs font-semibold text-[var(--brand-orange)]">{product.affiliateUrl}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-orange)]/15 bg-white text-[var(--brand-text)]"
                      aria-label={`Editar ${product.name}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#fecdd3] bg-white text-[#be123c]"
                      aria-label={`Excluir ${product.name}`}
                    >
                      <Trash2 size={16} />
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
