import { apiError, apiOk } from "@/lib/api-response";
import {
  deleteProductById,
  listCustomProducts,
  updateProductFromInput,
} from "@/lib/product-service";
import { parseProductFormData } from "@/lib/product-validation";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = Number(id);
    const existingProducts = await listCustomProducts();
    const existingProduct = existingProducts.find((item) => item.id === productId);

    if (!existingProduct) {
      return apiError("Produto nao encontrado.", 404);
    }

    const formData = await request.formData();
    const parsed = await parseProductFormData(formData);

    if (!parsed.success) {
      return apiError("Dados invalidos para atualizacao do produto.", 422, parsed.errors);
    }

    const updatedProduct = await updateProductFromInput(existingProduct, parsed.data);
    return apiOk({ product: updatedProduct });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Erro ao atualizar produto.", 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = Number(id);
    const deletedProduct = await deleteProductById(productId);

    if (!deletedProduct) {
      return apiError("Produto nao encontrado.", 404);
    }

    return apiOk({ success: true });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Erro ao excluir produto.", 500);
  }
}
