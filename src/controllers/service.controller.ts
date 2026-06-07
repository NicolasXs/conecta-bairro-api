import { ServiceService } from "../services/service.service";

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  async list(query: unknown) {
    return this.serviceService.list(query as Record<string, string | undefined>);
  }

  async create(actorId: string, body: unknown) {
    return this.serviceService.create(actorId, body);
  }

  async listByUser(userId: string) {
    return this.serviceService.listByUser(userId);
  }

  async update(serviceId: string, body: unknown, actorId: string) {
    return this.serviceService.update(serviceId, body, actorId);
  }

  async delete(serviceId: string, actorId: string) {
    await this.serviceService.delete(serviceId, actorId);
    return { success: true as const };
  }
}
