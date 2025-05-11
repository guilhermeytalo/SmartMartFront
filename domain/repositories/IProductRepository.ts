import { Product } from "@domain/entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Omit<Product, "id">): Promise<Product>;
  importFromCSV(products: Product[]): Promise<void>;
}
