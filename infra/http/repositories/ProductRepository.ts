import { apiClient } from '@/infra/http/api';

import { ApiProduct } from "@domain/entities/ApiProduct";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { ApiResponse } from "@domain/repositories/Response";


export class ProductRepository implements IProductRepository {
  async findAll(): Promise<ApiResponse<ApiProduct[]>> {
    try {
      const data = await apiClient.get("/products");
      return { success: true, data }

    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
      return { success: false, error: 'Erro ao carregar os produtos' };
    }
  }

  async create(product: Omit<Product, "id">): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.post("/products", product);
      return { success: true, data: response };
    } catch (error) {
      console.error("Erro ao criar os produto(s):", error);
      return { success: false, error: "Erro ao criar os produto(s)." };
    }
  }

  async importFromCSV(formData: FormData): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post("/products/import-csv", formData);
      return { success: true, data: response };
    } catch (error) {
      console.error("Erro ao importar produtos do CSV:", error);
      return { success: false, error: "Erro ao importar produtos do CSV." };
    }
  }
}
