import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async list() {
    return this.categoryService.list();
  }

  async create(name: string) {
    return this.categoryService.create(name);
  }

  async delete(id: string) {
    await this.categoryService.delete(id);
    return { success: true as const };
  }
}
