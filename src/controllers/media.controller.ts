import { MediaService } from "../services/media.service";

export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  async upload(actorId: string, body: unknown) {
    return this.mediaService.upload(actorId, body);
  }

  async delete(photoId: string, requesterId: string) {
    await this.mediaService.delete(photoId, requesterId);

    return {
      success: true as const,
    };
  }
}
