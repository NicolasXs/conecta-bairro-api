import { Database } from "../db";
import { categories } from "../db/schema";
import { Category } from "../domain/entities";
import { CategoryRepository } from "./category.repository";

const defaultCategories: Category[] = [
  { id: "cat-cleaning", name: "Cleaning" },
  { id: "cat-electrician", name: "Electrician" },
  { id: "cat-plumber", name: "Plumber" },
  { id: "cat-painter", name: "Painter" },
  { id: "cat-carpenter", name: "Carpenter" },
];

export class PostgresCategoryRepository implements CategoryRepository {
  constructor(private readonly db: Database) {}

  async list(): Promise<Category[]> {
    const rows = await this.db.select().from(categories);

    if (rows.length === 0) {
      await this.db.insert(categories).values(defaultCategories).onConflictDoNothing();
      return defaultCategories;
    }

    return rows.map((row) => ({ id: row.id, name: row.name }));
  }
}
