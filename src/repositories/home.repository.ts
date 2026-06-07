import { Service, User } from "../domain/entities";

export interface PopularService extends Service {
  avgScore: number;
  ratingCount: number;
}

export interface Professional extends Omit<User, "passwordHash"> {
  avgScore: number | null;
  ratingCount: number;
  serviceCount: number;
}

export interface RecommendationFilters {
  bairro?: string;
  cidade?: string;
  limit?: number;
}

export interface HomeRepository {
  listPopular(limit: number): Promise<PopularService[]>;
  listRecommendations(filters: RecommendationFilters): Promise<PopularService[]>;
  listProfessionals(limit: number): Promise<Professional[]>;
}
