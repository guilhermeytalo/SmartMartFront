import { apiClient } from '@/infra/http/api';

import { Category } from '@domain/entities/Category';
import { ICategoryRepository } from '@domain/repositories/ICategoryRepository';
import { ApiResponse } from "@domain/repositories/Response";


export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<ApiResponse<Category[]>> {
   try {
      const data = await apiClient.get("/categories");
      return {success: true, data}
      
    } catch (error) {
      console.error("Erro ao carregar as categorias:", error);
      return {success: false, error: 'Erro ao carregar as categorias'};
    }
  }
}
