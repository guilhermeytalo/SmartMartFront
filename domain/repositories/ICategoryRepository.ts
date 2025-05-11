import { Category } from "@domain/entities/Category";

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
}
