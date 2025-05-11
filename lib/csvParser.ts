import Papa from "papaparse";
import { Product } from "@domain/entities/Product";

export async function parseCSV(file: File): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Product>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (err) => reject(err),
    });
  });
}

export async function parseCSVToProducts(file: File): Promise<any[]> {
  const text = await file.text();
  const lines = text.trim().split('\n');
  const headers = lines.shift()?.split(',').map(h => h.trim());

  if (!headers) throw new Error('CSV inválido');

  return lines.map(line => {
    const values = line.split(',').map(v => v.trim());
    const product: Record<string, any> = {};

    headers.forEach((header, index) => {
      product[header] = values[index];
    });

    product.price = parseFloat(product.price);
    product.quantity = parseInt(product.quantity);
    product.category_id = parseInt(product.category_id);
    product.profit = product.price * product.quantity;

    return product;
  });
}

