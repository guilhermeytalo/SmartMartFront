import { ProductRepository } from "@infra/http/repositories/ProductRepository";
import { mapApiProductToProduct } from "@domain/mappers/ProductMapper";
import { Product } from "@domain/entities/Product";
import { ApiProduct } from "@domain/entities/ApiProduct";

const repository = new ProductRepository();

export async function getData(page: number, limit: number): Promise<{ products: Product[]; total: number }> {
  const response = await repository.findAll(page, limit);

  if (!response.success || !response.data) {
    console.error("Error fetching products:", response.error);
    return { products: [], total: 0 };
  }

  return {
    products: Array.isArray(response.data.items)
      ? response.data.items.map((item) => mapApiProductToProduct(item as unknown as ApiProduct))
      : [],
    total: response.data.total,
  };
}