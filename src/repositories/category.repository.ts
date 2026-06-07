import { Category } from "../domain/entities";

export interface CategoryRepository {
  list(): Promise<Category[]>;
  create(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}

export class InMemoryCategoryRepository implements CategoryRepository {
  private readonly categories = new Map<string, Category>();

  async list(): Promise<Category[]> {
    return [...this.categories.values()];
  }

  async create(category: Category): Promise<Category> {
    this.categories.set(category.id, category);
    return category;
  }

  async delete(id: string): Promise<void> {
    this.categories.delete(id);
  }
}
