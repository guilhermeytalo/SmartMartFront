import { Category } from "@domain/entities/Category";
import { ApiResponse } from "./Response";

export interface ICategoryRepository {
  findAll(): Promise<ApiResponse<Category[]>>;
}
