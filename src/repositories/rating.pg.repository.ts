import { eq } from "drizzle-orm";
import { Database } from "../db";
import { ratings } from "../db/schema";
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

    return this.toEntity(row);
  }

  async listByWorkerId(workerId: string): Promise<Rating[]> {
    const rows = await this.db.select().from(ratings).where(eq(ratings.workerId, workerId));

    return rows.map(this.toEntity);
  }

  private toEntity(row: typeof ratings.$inferSelect): Rating {
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
