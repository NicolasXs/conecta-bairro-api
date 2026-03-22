import { MediaPhoto } from "../domain/entities";

export interface MediaRepository {
  create(photo: MediaPhoto): Promise<MediaPhoto>;
  findById(photoId: string): Promise<MediaPhoto | null>;
  delete(photoId: string): Promise<void>;
}

export class InMemoryMediaRepository implements MediaRepository {
  private readonly photos = new Map<string, MediaPhoto>();

  async create(photo: MediaPhoto): Promise<MediaPhoto> {
    this.photos.set(photo.id, photo);
    return photo;
  }

  async findById(photoId: string): Promise<MediaPhoto | null> {
    return this.photos.get(photoId) ?? null;
  }

  async delete(photoId: string): Promise<void> {
    this.photos.delete(photoId);
  }
}
