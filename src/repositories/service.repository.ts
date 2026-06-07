import { Service } from "../domain/entities";

export interface ServiceFilters {
  category?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ServiceRepository {
  create(service: Service): Promise<Service>;
  list(filters?: ServiceFilters): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  findByWorkerId(workerId: string): Promise<Service[]>;
  update(service: Service): Promise<Service>;
  delete(id: string): Promise<void>;
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
      const matchesBairro = filters?.bairro
        ? service.bairro.toLowerCase() === filters.bairro.toLowerCase()
        : true;
      const matchesMinPrice =
        filters?.minPrice !== undefined
          ? service.price !== undefined && service.price >= filters.minPrice
          : true;
      const matchesMaxPrice =
        filters?.maxPrice !== undefined
          ? service.price !== undefined && service.price <= filters.maxPrice
          : true;

      return matchesCategory && matchesBairro && matchesMinPrice && matchesMaxPrice;
    });
  }

  async findById(id: string): Promise<Service | null> {
    return this.services.get(id) ?? null;
  }

  async findByWorkerId(workerId: string): Promise<Service[]> {
    return [...this.services.values()].filter((s) => s.workerId === workerId);
  }

  async update(service: Service): Promise<Service> {
    this.services.set(service.id, service);
    return service;
  }

  async delete(id: string): Promise<void> {
    this.services.delete(id);
  }
}
