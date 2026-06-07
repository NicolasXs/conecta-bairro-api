import { eq } from "drizzle-orm";
import { Database } from "../db";
import { users } from "../db/schema";
import { User } from "../domain/entities";
import { UserRepository } from "./user.repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly db: Database) {}

  async create(user: User): Promise<User> {
    const [row] = await this.db
      .insert(users)
      .values({
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl ?? null,
        coverUrl: user.coverUrl ?? null,
        bairro: user.bairro ?? null,
        cep: user.cep ?? null,
        cidade: user.cidade ?? null,
        description: user.description ?? null,
        contactLinks: user.contactLinks ?? null,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .returning();

    return this.toEntity(row);
  }

  async findById(id: string): Promise<User | null> {
    const [row] = await this.db.select().from(users).where(eq(users.id, id));
    return row ? this.toEntity(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await this.db.select().from(users).where(eq(users.email, email));
    return row ? this.toEntity(row) : null;
  }

  async update(user: User): Promise<User> {
    const [row] = await this.db
      .update(users)
      .set({
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl ?? null,
        coverUrl: user.coverUrl ?? null,
        bairro: user.bairro ?? null,
        cep: user.cep ?? null,
        cidade: user.cidade ?? null,
        description: user.description ?? null,
        contactLinks: user.contactLinks ?? null,
        passwordHash: user.passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    return this.toEntity(row);
  }

  private toEntity(row: typeof users.$inferSelect): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      avatarUrl: row.avatarUrl ?? undefined,
      coverUrl: row.coverUrl ?? undefined,
      bairro: row.bairro ?? undefined,
      cep: row.cep ?? undefined,
      cidade: row.cidade ?? undefined,
      description: row.description ?? undefined,
      contactLinks: row.contactLinks ?? undefined,
      passwordHash: row.passwordHash,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
