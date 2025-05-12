import { PaginatedApiProductResponse } from "@domain/entities/ApiProduct";
import { Product } from "@domain/entities/Product";
import { ApiResponse } from "./Response";

export interface IProductRepository {
  findAll(skip: number, limit: number): Promise<ApiResponse<{ items: PaginatedApiProductResponse[]; total: number }>>;
  create(product: Omit<Product, "id">): Promise<ApiResponse<Product>>;
  importFromCSV(data: FormData): Promise<ApiResponse<void>>;
  sampleCSV(): Promise<ApiResponse<string>>;
}
