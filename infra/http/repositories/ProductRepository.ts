import { apiClient } from '@/infra/http/api';
import { PaginatedApiProductResponse } from "@domain/entities/ApiProduct";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { ApiResponse } from "@domain/repositories/Response";

export class ProductRepository implements IProductRepository {
  async findAll(page = 1, limit = 10): Promise<ApiResponse<{ items: PaginatedApiProductResponse[]; total: number }>> {
    try {
      const response = await apiClient.get(`/products?page=${page}&per_page=${limit}`);
      return { success: true, data: response };
    } catch (error) {
      console.error("Error Loading Products:", error);
      return { success: false, error: 'Error Loading Products' };
    }
  }

  async create(product: Omit<Product, "id">): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.post("/products", product);
      return { success: true, data: response };
    } catch (error) {
      console.error("Error Creating Products:", error);
      return { success: false, error: "Error Creating Products!" };
    }
  }

  async importFromCSV(formData: FormData): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post("/products/import-csv", formData);
      return { success: true, data: response };
    } catch (error) {
      console.error("Error importing CSV Files", error);
      return { success: false, error: "Error importing CSV Files!" };
    }
  }

  async sampleCSV(): Promise<ApiResponse<string>> {
    try {
      const response = await apiClient.get("/products/sample-csv", { responseType: 'text' });
      return { success: true, data: response };
    } catch (error) {
      console.error("Error Dowloading the CSV Example:", error);
      return { success: false, error: "Error Dowloading the CSV Example!" };
    }
  }
}
