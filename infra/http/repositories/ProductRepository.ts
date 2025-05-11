import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    const res = await fetch("/mock/products.json");
    return res.json();
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    return { ...product, id: Date.now() };
  }

  async importFromCSV(products: Product[]): Promise<void> {
    console.log("Importing from CSV...", products);
  }
}
