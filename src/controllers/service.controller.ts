import { ServiceService } from "../services/service.service";
import { UserRole } from "../domain/entities";

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  async list(query: unknown) {
    return this.serviceService.list(query as Record<string, string | undefined>);
  }

  async create(actorId: string, actorRole: UserRole, body: unknown) {
    return this.serviceService.create(actorId, actorRole, body);
  }
}
