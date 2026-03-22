import { Category } from "../domain/entities";

export interface CategoryRepository {
  list(): Promise<Category[]>;
}

const defaultCategories: Category[] = [
  { id: "cat-cleaning", name: "Cleaning" },
  { id: "cat-electrician", name: "Electrician" },
  { id: "cat-plumber", name: "Plumber" },
  { id: "cat-painter", name: "Painter" },
  { id: "cat-carpenter", name: "Carpenter" },
];

export class InMemoryCategoryRepository implements CategoryRepository {
  async list(): Promise<Category[]> {
    return defaultCategories;
  }
}
