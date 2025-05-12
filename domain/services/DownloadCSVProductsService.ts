import { IProductRepository } from "@domain/repositories/IProductRepository";

export class DownloadCSVProductsService {
    constructor(private readonly productRepo: IProductRepository) {}
    
    async execute(): Promise<string> {
        const response = await this.productRepo.sampleCSV();
        return response.data!;
    }
}
