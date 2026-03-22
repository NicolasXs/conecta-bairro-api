import { RatingService } from "../services/rating.service";
import { UserRole } from "../domain/entities";

export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  async create(actorId: string, actorRole: UserRole, body: unknown) {
    return this.ratingService.create(actorId, actorRole, body);
  }

  async listByWorkerId(workerId: string) {
    return this.ratingService.listByWorkerId(workerId);
  }
}
