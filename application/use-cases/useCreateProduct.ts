"use client";

import { useCallback } from "react";
import { CreateProductService } from "@domain/services/CreateProductService";
import { Product } from "@domain/entities/Product";
import { ProductRepository } from "@infra/http/repositories/ProductRepository";

const repo = new ProductRepository();
const service = new CreateProductService(repo);

export function useCreateProduct() {
  return useCallback(async (data: Omit<Product, "id">) => {
    return await service.execute(data);
  }, []);
}
