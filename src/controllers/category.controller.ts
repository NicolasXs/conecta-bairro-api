import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async list() {
    return this.categoryService.list();
  }
}
