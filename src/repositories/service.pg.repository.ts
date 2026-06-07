import { and, eq, ilike, sql } from "drizzle-orm";
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
        bairro: service.bairro,
        title: service.title,
        description: service.description,
        price: service.price?.toString() ?? null,
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

    if (filters?.bairro) {
      conditions.push(sql`lower(${services.bairro}) = lower(${filters.bairro})`);
    }

    if (filters?.cidade) {
      conditions.push(sql`lower(${users.cidade}) = lower(${filters.cidade})`);
    }

    if (filters?.cep) {
      conditions.push(eq(users.cep, filters.cep));
    }

    if (filters?.q) {
      const term = `%${filters.q}%`;
      conditions.push(
        sql`(${ilike(services.title, term)} OR ${ilike(services.description, term)})`,
      );
    }

    if (filters?.minPrice !== undefined) {
      conditions.push(sql`${services.price} IS NOT NULL AND ${services.price}::numeric >= ${filters.minPrice}`);
    }

    if (filters?.maxPrice !== undefined) {
      conditions.push(sql`${services.price} IS NOT NULL AND ${services.price}::numeric <= ${filters.maxPrice}`);
    }

    const rows = await this.db
      .select({
        service: services,
        workerName: users.name,
      })
      .from(services)
      .innerJoin(users, eq(services.workerId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return rows.map((row) => ({
      ...this.toBaseEntity(row.service),
      workerName: row.workerName,
    }));
  }

  async findById(id: string): Promise<Service | null> {
    const rows = await this.db
      .select({ service: services, workerName: users.name })
      .from(services)
      .innerJoin(users, eq(services.workerId, users.id))
      .where(eq(services.id, id))
      .limit(1);

    if (rows.length === 0) return null;
    return { ...this.toBaseEntity(rows[0].service), workerName: rows[0].workerName };
  }

  async findByWorkerId(workerId: string): Promise<Service[]> {
    const rows = await this.db
      .select({ service: services, workerName: users.name })
      .from(services)
      .innerJoin(users, eq(services.workerId, users.id))
      .where(eq(services.workerId, workerId));

    return rows.map((row) => ({ ...this.toBaseEntity(row.service), workerName: row.workerName }));
  }

  async update(service: Service): Promise<Service> {
    const [row] = await this.db
      .update(services)
      .set({
        category: service.category,
        bairro: service.bairro,
        title: service.title,
        description: service.description,
        price: service.price?.toString() ?? null,
      })
      .where(eq(services.id, service.id))
      .returning();

    return { ...this.toBaseEntity(row), workerName: service.workerName };
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(services).where(eq(services.id, id));
  }

  private toBaseEntity(row: typeof services.$inferSelect): Omit<Service, "workerName"> {
    return {
      id: row.id,
      workerId: row.workerId,
      category: row.category,
      bairro: row.bairro,
      title: row.title,
      description: row.description,
      price: row.price !== null ? Number(row.price) : undefined,
      createdAt: row.createdAt,
    };
  }
}
