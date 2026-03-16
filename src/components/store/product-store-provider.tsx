"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { products as defaultProducts } from "@/data/products";

type ProductInput = Omit<Product, "id" | "slug" | "reviewCount" | "rating"> & {
  reviewCount?: number;
  rating?: number;
};

type ProductStoreContextValue = {
  defaultProducts: Product[];
  customProducts: Product[];
  allProducts: Product[];
  isLoading: boolean;
  addProduct: (product: ProductInput, imageFile?: File | null) => Promise<void>;
  updateProduct: (productId: number, product: ProductInput, imageFile?: File | null, removeImage?: boolean) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
};

const ProductStoreContext = createContext<ProductStoreContextValue | null>(null);

export function ProductStoreProvider({ children }: { children: React.ReactNode }) {
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/custom-products", { cache: "no-store" });
        const data = (await response.json()) as { products: Product[] };
        setCustomProducts(data.products ?? []);
      } finally {
        setIsLoading(false);
      }
    }

    void loadProducts();
  }, []);

  async function addProduct(product: ProductInput, imageFile?: File | null) {
    const formData = new FormData();
    formData.set("name", product.name);
    formData.set("shortDescription", product.shortDescription);
    formData.set("description", product.description);
    formData.set("oldPrice", String(product.oldPrice));
    formData.set("price", String(product.price));
    formData.set("discountLabel", product.discountLabel);
    formData.set("category", product.category);
    formData.set("categorySlug", product.categorySlug);
    formData.set("affiliateUrl", product.affiliateUrl);
    formData.set("cta", product.cta);
    formData.set("badge", product.badge);
    formData.set("iconKey", product.iconKey);
    formData.set("accentFrom", product.accentFrom);
    formData.set("accentTo", product.accentTo);
    formData.set("existingImageUrl", product.imageUrl ?? "");

    if (imageFile) {
      formData.set("image", imageFile);
    }

    const response = await fetch("/api/custom-products", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const data = (await response.json()) as { product: Product };
    setCustomProducts((current) => [data.product, ...current]);
  }

  async function updateProduct(
    productId: number,
    product: ProductInput,
    imageFile?: File | null,
    removeImage = false,
  ) {
    const formData = new FormData();
    formData.set("name", product.name);
    formData.set("shortDescription", product.shortDescription);
    formData.set("description", product.description);
    formData.set("oldPrice", String(product.oldPrice));
    formData.set("price", String(product.price));
    formData.set("discountLabel", product.discountLabel);
    formData.set("category", product.category);
    formData.set("categorySlug", product.categorySlug);
    formData.set("affiliateUrl", product.affiliateUrl);
    formData.set("cta", product.cta);
    formData.set("badge", product.badge);
    formData.set("iconKey", product.iconKey);
    formData.set("existingImageUrl", product.imageUrl ?? "");
    formData.set("removeImage", String(removeImage));

    if (imageFile) {
      formData.set("image", imageFile);
    }

    const response = await fetch(`/api/custom-products/${productId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const data = (await response.json()) as { product: Product };

    setCustomProducts((current) =>
      current.map((item) => (item.id === productId ? data.product : item)),
    );
  }

  async function removeProduct(productId: number) {
    const response = await fetch(`/api/custom-products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    setCustomProducts((current) => current.filter((item) => item.id !== productId));
  }

  const value = useMemo(
    () => ({
      defaultProducts,
      customProducts,
      allProducts: [...customProducts, ...defaultProducts],
      isLoading,
      addProduct,
      updateProduct,
      removeProduct,
    }),
    [customProducts, isLoading],
  );

  return <ProductStoreContext.Provider value={value}>{children}</ProductStoreContext.Provider>;
}

export function useProductStore() {
  const context = useContext(ProductStoreContext);

  if (!context) {
    throw new Error("useProductStore must be used inside ProductStoreProvider");
  }

  return context;
}
