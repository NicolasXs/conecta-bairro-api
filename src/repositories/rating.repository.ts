import { Rating } from "../domain/entities";

export interface RatingRepository {
  create(rating: Rating): Promise<Rating>;
  listByWorkerId(workerId: string): Promise<Rating[]>;
}

export class InMemoryRatingRepository implements RatingRepository {
  private readonly ratings = new Map<string, Rating>();

  async create(rating: Rating): Promise<Rating> {
    this.ratings.set(rating.id, rating);
    return rating;
  }

  async listByWorkerId(workerId: string): Promise<Rating[]> {
    return [...this.ratings.values()].filter((rating) => rating.workerId === workerId);
  }
}
