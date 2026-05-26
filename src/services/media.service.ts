import { z } from "zod";
import { AppError } from "../domain/errors";
import { MediaPhoto } from "../domain/entities";
import { createId } from "../lib/id";
import type { MediaRepository } from "../repositories/media.repository";
import { uploadMediaBodySchema } from "../app/openapi.schemas";

const uploadMediaSchema = uploadMediaBodySchema;

type UploadMediaInput = z.infer<typeof uploadMediaSchema>;

export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async upload(userId: string, input: unknown): Promise<MediaPhoto> {
    const payload = uploadMediaSchema.parse(input) as UploadMediaInput;
    const photo: MediaPhoto = {
      id: createId(),
      workerId: userId,
      url: payload.url,
      createdAt: new Date(),
    };

    return this.mediaRepository.create(photo);
  }

  async delete(photoId: string, requesterId: string): Promise<void> {
    const photo = await this.mediaRepository.findById(photoId);

    if (!photo) {
      throw new AppError(404, "PHOTO_NOT_FOUND", "Foto não encontrada.");
    }

    if (photo.workerId !== requesterId) {
      throw new AppError(403, "FORBIDDEN", "Você só pode remover suas próprias fotos.");
    }

    await this.mediaRepository.delete(photoId);
  }
}
