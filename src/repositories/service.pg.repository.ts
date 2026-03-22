import { and, eq, sql } from "drizzle-orm";
import { Database } from "../db";
import { services, users } from "../db/schema";
import { Service } from "../domain/entities";
import { ServiceFilters, ServiceRepository } from "./service.repository";

export class PostgresServiceRepository implements ServiceRepository {
  constructor(private readonly db: Database) {}

  async create(service: Service): Promise<Service> {
    const [row] = await this.db
      .insert(services)
      .values({
        id: service.id,
        workerId: service.workerId,
        category: service.category,
        neighborhood: service.neighborhood,
        title: service.title,
        description: service.description,
        createdAt: service.createdAt,
      })
      .returning();

    return {
      ...this.toBaseEntity(row),
      workerName: service.workerName,
    };
  }

  async list(filters?: ServiceFilters): Promise<Service[]> {
    const conditions = [];

    if (filters?.category) {
      conditions.push(sql`lower(${services.category}) = lower(${filters.category})`);
    }

    if (filters?.neighborhood) {
      conditions.push(sql`lower(${services.neighborhood}) = lower(${filters.neighborhood})`);
    }

    const rows =
      conditions.length > 0
        ? await this.db
            .select({
              service: services,
              workerName: users.name,
            })
            .from(services)
            .innerJoin(users, eq(services.workerId, users.id))
            .where(and(...conditions))
        : await this.db
            .select({
              service: services,
              workerName: users.name,
            })
            .from(services)
            .innerJoin(users, eq(services.workerId, users.id));

    return rows.map((row) => ({
      ...this.toBaseEntity(row.service),
      workerName: row.workerName,
    }));
  }

  private toBaseEntity(row: typeof services.$inferSelect): Omit<Service, "workerName"> {
    return {
      id: row.id,
      workerId: row.workerId,
      category: row.category,
      neighborhood: row.neighborhood,
      title: row.title,
      description: row.description,
      createdAt: row.createdAt,
    };
  }
}
