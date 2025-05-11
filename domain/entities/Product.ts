import { Category } from "./Category";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  brand: string;
  quantity: number;
  profit: number;
}

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  brand: string;
  quantity: number;
  category: Category;
};
