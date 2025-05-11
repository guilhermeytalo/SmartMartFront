import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { apiClient } from '@/infra/http/api';
import { ApiResponse } from "@domain/repositories/Response";

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<ApiResponse<Product[]>> {
    try {
      const data = await apiClient.get("/products");
      return {success: true, data}
      
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
      return {success: false, error: 'Erro ao carregar os produtos'};
    }
  }

  async create(product: Omit<Product, "id">): Promise<ApiResponse<Product>> {
    try {
      const newProduct = { ...product, id: Date.now() };
      return { success: true, data: newProduct };
    } catch (error) {
      console.error("Erro ao criar os produto(s):", error);
      return { success: false, error: "Erro ao criar os produto(s)." };
    }
  }

  async importFromCSV(products: Product[]): Promise<ApiResponse<void>> {
    try {
      console.log("Importado produtos do CSV...", products);
      return { success: true };
    } catch (error) {
      console.error("Erro ao importar produtos do CSV:", error);
      return { success: false, error: "Erro ao importar produtos do CSV." };
    }
  }
}
