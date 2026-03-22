import { eq } from "drizzle-orm";
import { Database } from "../db";
import { mediaPhotos } from "../db/schema";
import { MediaPhoto } from "../domain/entities";
import { MediaRepository } from "./media.repository";

export class PostgresMediaRepository implements MediaRepository {
  constructor(private readonly db: Database) {}

  async create(photo: MediaPhoto): Promise<MediaPhoto> {
    const [row] = await this.db
      .insert(mediaPhotos)
      .values({
        id: photo.id,
        workerId: photo.workerId,
        url: photo.url,
        createdAt: photo.createdAt,
      })
      .returning();

    return this.toEntity(row);
  }

  async findById(photoId: string): Promise<MediaPhoto | null> {
    const [row] = await this.db.select().from(mediaPhotos).where(eq(mediaPhotos.id, photoId));

    return row ? this.toEntity(row) : null;
  }

  async delete(photoId: string): Promise<void> {
    await this.db.delete(mediaPhotos).where(eq(mediaPhotos.id, photoId));
  }

  private toEntity(row: typeof mediaPhotos.$inferSelect): MediaPhoto {
    return {
      id: row.id,
      workerId: row.workerId,
      url: row.url,
      createdAt: row.createdAt,
    };
  }
}
