import { Service } from "../domain/entities";

export interface ServiceFilters {
  category?: string;
  neighborhood?: string;
}

export interface ServiceRepository {
  create(service: Service): Promise<Service>;
  list(filters?: ServiceFilters): Promise<Service[]>;
}

export class InMemoryServiceRepository implements ServiceRepository {
  private readonly services = new Map<string, Service>();

  async create(service: Service): Promise<Service> {
    this.services.set(service.id, service);
    return service;
  }

  async list(filters?: ServiceFilters): Promise<Service[]> {
    const allServices = [...this.services.values()];

    return allServices.filter((service) => {
      const matchesCategory = filters?.category
        ? service.category.toLowerCase() === filters.category.toLowerCase()
        : true;
      const matchesNeighborhood = filters?.neighborhood
        ? service.neighborhood.toLowerCase() === filters.neighborhood.toLowerCase()
        : true;

      return matchesCategory && matchesNeighborhood;
    });
  }
}
