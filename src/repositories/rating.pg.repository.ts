import { eq } from "drizzle-orm";
import { Database } from "../db";
import { ratings, users } from "../db/schema";
import { Rating } from "../domain/entities";
import { RatingRepository } from "./rating.repository";

export class PostgresRatingRepository implements RatingRepository {
  constructor(private readonly db: Database) {}

  async create(rating: Rating): Promise<Rating> {
    const [row] = await this.db
      .insert(ratings)
      .values({
        id: rating.id,
        workerId: rating.workerId,
        clientId: rating.clientId,
        score: rating.score,
        comment: rating.comment ?? null,
        createdAt: rating.createdAt,
      })
      .returning();

    return { ...this.toBaseEntity(row), clientName: rating.clientName };
  }

  async listByWorkerId(workerId: string): Promise<Rating[]> {
    const rows = await this.db
      .select({ rating: ratings, clientName: users.name })
      .from(ratings)
      .innerJoin(users, eq(ratings.clientId, users.id))
      .where(eq(ratings.workerId, workerId));

    return rows.map((row) => ({ ...this.toBaseEntity(row.rating), clientName: row.clientName }));
  }

  private toBaseEntity(row: typeof ratings.$inferSelect): Omit<Rating, "clientName"> {
    return {
      id: row.id,
      workerId: row.workerId,
      clientId: row.clientId,
      score: row.score,
      comment: row.comment ?? undefined,
      createdAt: row.createdAt,
    };
  }
}
