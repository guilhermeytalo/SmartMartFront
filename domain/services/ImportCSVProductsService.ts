import { IProductRepository } from "@domain/repositories/IProductRepository";

export class ImportCSVProductsService {
    constructor(private readonly productRepo: IProductRepository) {}
    
    async execute(formData: FormData): Promise<void> {
        const response = await this.productRepo.importFromCSV(formData);
        return response.data!;
    }
}
