import { CategoriesTypes } from "./categories";

export interface ProductTypes {
  id: number;
  name: string;
  description: string;
  harga: number;
  stock: number;
  berat: number;
  slug: string;
  categories: CategoriesTypes[];
}
