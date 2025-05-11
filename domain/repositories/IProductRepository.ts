import { Product } from "@domain/entities/Product";
import { ApiResponse } from "./Response";
import { ApiProduct } from "@domain/entities/ApiProduct";

export interface IProductRepository {
  findAll(): Promise<ApiResponse<ApiProduct[]>>;
  create(product: Omit<Product, "id">): Promise<ApiResponse<Product>>;
  importFromCSV(products: Product[]): Promise<ApiResponse<void>>;
}
