import { z } from "zod";
import { AppError } from "../domain/errors";
import { Service } from "../domain/entities";
import { createId } from "../lib/id";
import type { ServiceRepository } from "../repositories/service.repository";
import type { UserRepository } from "../repositories/user.repository";
import {
  serviceCreateBodySchema,
  serviceListQuerySchema,
  serviceUpdateBodySchema,
} from "../app/openapi.schemas";

const createServiceSchema = serviceCreateBodySchema;
const updateServiceSchema = serviceUpdateBodySchema;
const listServicesQuerySchema = serviceListQuerySchema;

type CreateServiceInput = z.infer<typeof createServiceSchema>;
type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
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
      price: payload.price,
      createdAt: new Date(),
    };

    return this.serviceRepository.create(service);
  }

  async list(query: unknown): Promise<Service[]> {
    const filters = listServicesQuerySchema.parse(query) as ListServicesQuery;
    return this.serviceRepository.list(filters);
  }

  async listByUser(userId: string): Promise<Service[]> {
    return this.serviceRepository.findByWorkerId(userId);
  }

  async update(serviceId: string, input: unknown, actorId: string): Promise<Service> {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      throw new AppError(404, "SERVICE_NOT_FOUND", "Serviço não encontrado.");
    }

    if (service.workerId !== actorId) {
      throw new AppError(403, "FORBIDDEN", "Você só pode atualizar os próprios serviços.");
    }

    const payload = updateServiceSchema.parse(input) as UpdateServiceInput;
    const updated: Service = {
      ...service,
      category: payload.category ?? service.category,
      bairro: payload.bairro ?? service.bairro,
      title: payload.title ?? service.title,
      description: payload.description ?? service.description,
      price: payload.price ?? service.price,
    };

    return this.serviceRepository.update(updated);
  }

  async delete(serviceId: string, actorId: string): Promise<void> {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      throw new AppError(404, "SERVICE_NOT_FOUND", "Serviço não encontrado.");
    }

    if (service.workerId !== actorId) {
      throw new AppError(403, "FORBIDDEN", "Você só pode apagar os próprios serviços.");
    }

    await this.serviceRepository.delete(serviceId);
  }
}
