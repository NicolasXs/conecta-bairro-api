import { z } from "zod";
import { AppError } from "../domain/errors";
import { Rating, UserRole } from "../domain/entities";
import { createId } from "../lib/id";
import type { RatingRepository } from "../repositories/rating.repository";
import type { UserRepository } from "../repositories/user.repository";
import { createRatingBodySchema } from "../app/openapi.schemas";

const createRatingSchema = createRatingBodySchema;

type CreateRatingInput = z.infer<typeof createRatingSchema>;

export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(clientId: string, role: UserRole, input: unknown): Promise<Rating> {
    if (role !== "client") {
      throw new AppError(403, "FORBIDDEN", "Apenas clientes podem avaliar serviços.");
    }

    const payload = createRatingSchema.parse(input) as CreateRatingInput;
    const worker = await this.userRepository.findById(payload.workerId);

    if (!worker || worker.role !== "worker") {
      throw new AppError(404, "WORKER_NOT_FOUND", "Worker não encontrado.");
    }

    const rating: Rating = {
      id: createId(),
      workerId: payload.workerId,
      clientId,
      score: payload.score,
      comment: payload.comment,
      createdAt: new Date(),
    };

    return this.ratingRepository.create(rating);
  }

  async listByWorkerId(workerId: string): Promise<Rating[]> {
    return this.ratingRepository.listByWorkerId(workerId);
  }
}
