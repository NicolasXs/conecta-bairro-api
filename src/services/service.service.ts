import { z } from "zod";
import { AppError } from "../domain/errors";
import { Service } from "../domain/entities";
import { createId } from "../lib/id";
import type { ServiceRepository } from "../repositories/service.repository";
import type { UserRepository } from "../repositories/user.repository";
import { serviceCreateBodySchema, serviceListQuerySchema } from "../app/openapi.schemas";

const createServiceSchema = serviceCreateBodySchema;

const listServicesQuerySchema = serviceListQuerySchema;

type CreateServiceInput = z.infer<typeof createServiceSchema>;
type ListServicesQuery = z.infer<typeof listServicesQuerySchema>;

export class ServiceService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userId: string, input: unknown): Promise<Service> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "Usuário não encontrado.");
    }

    const payload = createServiceSchema.parse(input) as CreateServiceInput;
    const service: Service = {
      id: createId(),
      workerId: userId,
      workerName: user.name,
      category: payload.category,
      bairro: payload.bairro,
      title: payload.title,
      description: payload.description,
      createdAt: new Date(),
    };

    return this.serviceRepository.create(service);
  }

  async list(query: unknown): Promise<Service[]> {
    const filters = listServicesQuerySchema.parse(query) as ListServicesQuery;
    return this.serviceRepository.list(filters);
  }
}
