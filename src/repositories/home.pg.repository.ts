import { and, avg, count, countDistinct, desc, eq, sql } from "drizzle-orm";
import { Database } from "../db";
import { ratings, services, users } from "../db/schema";
import {
  HomeRepository,
  PopularService,
  Professional,
  RecommendationFilters,
} from "./home.repository";

export class PostgresHomeRepository implements HomeRepository {
  constructor(private readonly db: Database) {}

  async listPopular(limit: number): Promise<PopularService[]> {
    const rows = await this.db
      .select({
        id: services.id,
        workerId: services.workerId,
        workerName: users.name,
        category: services.category,
        bairro: services.bairro,
        title: services.title,
        description: services.description,
        price: services.price,
        imageUrl: services.imageUrl,
        createdAt: services.createdAt,
        avgScore: avg(ratings.score),
        ratingCount: count(ratings.id),
      })
      .from(services)
      .innerJoin(users, eq(services.workerId, users.id))
      .leftJoin(ratings, eq(ratings.workerId, services.workerId))
      .groupBy(services.id, users.name)
      .orderBy(desc(avg(ratings.score)), desc(count(ratings.id)))
      .limit(limit);

    return rows.map((row) => ({
      ...row,
      price: row.price !== null ? Number(row.price) : undefined,
      imageUrl: row.imageUrl ?? undefined,
      avgScore: row.avgScore ? Number(row.avgScore) : 0,
      ratingCount: Number(row.ratingCount),
    }));
  }

  async listRecommendations(filters: RecommendationFilters): Promise<PopularService[]> {
    const limit = filters.limit ?? 10;
    const conditions = [];

    if (filters.bairro) {
      conditions.push(sql`lower(${services.bairro}) = lower(${filters.bairro})`);
    }

    if (filters.cidade) {
      conditions.push(sql`lower(${users.cidade}) = lower(${filters.cidade})`);
    }

    const rows = await this.db
      .select({
        id: services.id,
        workerId: services.workerId,
        workerName: users.name,
        category: services.category,
        bairro: services.bairro,
        title: services.title,
        description: services.description,
        price: services.price,
        imageUrl: services.imageUrl,
        createdAt: services.createdAt,
        avgScore: avg(ratings.score),
        ratingCount: count(ratings.id),
      })
      .from(services)
      .innerJoin(users, eq(services.workerId, users.id))
      .leftJoin(ratings, eq(ratings.workerId, services.workerId))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(services.id, users.name)
      .orderBy(desc(avg(ratings.score)), desc(count(ratings.id)))
      .limit(limit);

    return rows.map((row) => ({
      ...row,
      price: row.price !== null ? Number(row.price) : undefined,
      imageUrl: row.imageUrl ?? undefined,
      avgScore: row.avgScore ? Number(row.avgScore) : 0,
      ratingCount: Number(row.ratingCount),
    }));
  }

  async listProfessionals(limit: number): Promise<Professional[]> {
    const rows = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        bairro: users.bairro,
        cep: users.cep,
        cidade: users.cidade,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        avgScore: avg(ratings.score),
        ratingCount: countDistinct(ratings.id),
        serviceCount: countDistinct(services.id),
      })
      .from(users)
      .innerJoin(services, eq(services.workerId, users.id))
      .leftJoin(ratings, eq(ratings.workerId, users.id))
      .groupBy(users.id)
      .orderBy(desc(avg(ratings.score)), desc(countDistinct(ratings.id)))
      .limit(limit);

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      bairro: row.bairro ?? undefined,
      cep: row.cep ?? undefined,
      cidade: row.cidade ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      avgScore: row.avgScore !== null ? Number(row.avgScore) : null,
      ratingCount: Number(row.ratingCount),
      serviceCount: Number(row.serviceCount),
    }));
  }
}
