import { Product } from "@domain/entities/Product";
import { ApiResponse } from "./Response";

export interface IProductRepository {
  findAll(): Promise<ApiResponse<Product[]>>;
  create(product: Omit<Product, "id">): Promise<ApiResponse<Product>>;
  importFromCSV(products: Product[]): Promise<ApiResponse<void>>;
}
