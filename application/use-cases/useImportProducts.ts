"use client";
import { ImportCSVProductsService } from "@domain/services/ImportCSVProductsService";
import { ProductRepository } from "@infra/http/repositories/ProductRepository";
import { useCallback } from "react";

const repo = new ProductRepository();
const service = new ImportCSVProductsService(repo);

export function useImportProducts() {
  return useCallback(async (formData: FormData) => {
    return await service.execute(formData);
  }, []);
}