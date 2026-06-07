import { Category } from "../domain/entities";
import { AppError } from "../domain/errors";
import { createId } from "../lib/id";
import type { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async list(): Promise<Category[]> {
    return this.categoryRepository.list();
  }

  async create(name: string): Promise<Category> {
    const existing = await this.categoryRepository.list();
    const duplicate = existing.find((c) => c.name.toLowerCase() === name.toLowerCase());

    if (duplicate) {
      throw new AppError(409, "CATEGORY_ALREADY_EXISTS", "Já existe uma categoria com esse nome.");
    }

    return this.categoryRepository.create({ id: createId(), name });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.categoryRepository.list();
    const found = existing.find((c) => c.id === id);

    if (!found) {
      throw new AppError(404, "CATEGORY_NOT_FOUND", "Categoria não encontrada.");
    }

    await this.categoryRepository.delete(id);
  }
}
