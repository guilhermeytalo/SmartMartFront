import { ApiProduct } from "@domain/entities/ApiProduct";
import { Product } from "@domain/entities/Product";

export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    ...apiProduct,
    categoryId: apiProduct.category_id,
  };
}
