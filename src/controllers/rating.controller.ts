import { RatingService } from "../services/rating.service";

export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  async create(actorId: string, body: unknown) {
    return this.ratingService.create(actorId, body);
  }

  async listByWorkerId(workerId: string) {
    return this.ratingService.listByWorkerId(workerId);
  }
}
