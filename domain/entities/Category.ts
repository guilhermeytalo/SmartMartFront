export interface Category {
  id?: number;
  name: string;
  description?: string;
}

export const CategoryType: Record<number, string> = {
  1: "TVs",
  2: "Refrigerators",
  3: "Laptops",
  4: "Microwaves",
  5: "Smartphones",
};
