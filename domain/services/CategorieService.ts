import { CategoryRepository } from "@infra/http/repositories/CategoryRepository";

const repository = new CategoryRepository();

export async function getCategories() {
  const response = await repository.findAll();

  if (!response.success || !response.data) {
    console.error("Error fetching categories:", response.error);
    return [];
  }

  return response.data;
}