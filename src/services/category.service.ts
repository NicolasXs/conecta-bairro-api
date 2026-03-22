import { Category } from "../domain/entities";
import type { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async list(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}
