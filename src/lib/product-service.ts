import type { Product } from "@/data/products";
import {
  createCustomProduct,
  deleteCustomProduct,
  findCustomProductById,
  readCustomProducts,
  removeImageFile,
  saveImageFile,
  updateCustomProduct,
} from "@/lib/custom-products";
import { buildProductPayload, type ValidatedProductInput } from "@/lib/product-validation";

export async function listCustomProducts() {
  return readCustomProducts();
}

export async function createProductFromInput(input: ValidatedProductInput) {
  const imageUrl = input.imageFile ? await saveImageFile(input.imageFile, input.name) : input.existingImageUrl;
  return createCustomProduct(buildProductPayload(input, imageUrl || undefined));
}

export async function updateProductFromInput(existingProduct: Product, input: ValidatedProductInput) {
  let imageUrl = input.existingImageUrl || existingProduct.imageUrl;

  if (input.removeImage && imageUrl) {
    await removeImageFile(imageUrl);
    imageUrl = undefined;
  }

  if (input.imageFile) {
    if (existingProduct.imageUrl) {
      await removeImageFile(existingProduct.imageUrl);
    }
    imageUrl = await saveImageFile(input.imageFile, input.name);
  }

  return updateCustomProduct(existingProduct.id, buildProductPayload(input, imageUrl || undefined));
}

export async function deleteProductById(productId: number) {
  return deleteCustomProduct(productId);
}

export async function findProductById(productId: number) {
  return findCustomProductById(productId);
}
