import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";

export class CreateProductService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(data: Omit<Product, "id">): Promise<Product> {
    const response = await this.productRepo.create(data);
    return response.data!;
  }
}
