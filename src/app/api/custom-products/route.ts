import { apiCreated, apiError, apiOk } from "@/lib/api-response";
import { createProductFromInput, listCustomProducts } from "@/lib/product-service";
import { parseProductFormData } from "@/lib/product-validation";

export async function GET() {
  try {
    const products = await listCustomProducts();
    return apiOk({ products });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Erro ao listar produtos.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const parsed = await parseProductFormData(formData);

    if (!parsed.success) {
      return apiError("Dados invalidos para cadastro do produto.", 422, parsed.errors);
    }

    const createdProduct = await createProductFromInput(parsed.data);
    return apiCreated({ product: createdProduct });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Erro ao criar produto.", 500);
  }
}
