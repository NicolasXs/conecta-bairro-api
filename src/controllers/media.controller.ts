import { MediaService } from "../services/media.service";
import { UserRole } from "../domain/entities";

export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  async upload(actorId: string, actorRole: UserRole, body: unknown) {
    return this.mediaService.upload(actorId, actorRole, body);
  }

  async delete(photoId: string, requesterId: string) {
    await this.mediaService.delete(photoId, requesterId);

    return {
      success: true as const,
    };
  }
}
