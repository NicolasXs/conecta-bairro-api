import { eq } from "drizzle-orm";
import { Database } from "../db";
import { categories } from "../db/schema";
import { Category } from "../domain/entities";
import { CategoryRepository } from "./category.repository";

export class PostgresCategoryRepository implements CategoryRepository {
  constructor(private readonly db: Database) {}

  async list(): Promise<Category[]> {
    const rows = await this.db.select().from(categories).orderBy(categories.name);
    return rows.map((row) => ({ id: row.id, name: row.name }));
  }

  async create(category: Category): Promise<Category> {
    const [row] = await this.db
      .insert(categories)
      .values({ id: category.id, name: category.name })
      .returning();
    return { id: row.id, name: row.name };
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(categories).where(eq(categories.id, id));
  }
}
