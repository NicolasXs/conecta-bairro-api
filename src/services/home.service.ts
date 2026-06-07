import type { HomeRepository, PopularService, Professional } from "../repositories/home.repository";

export class HomeService {
  constructor(private readonly homeRepository: HomeRepository) {}

  async getPopular(limit: number): Promise<PopularService[]> {
    return this.homeRepository.listPopular(limit);
  }

  async getRecommendations(
    bairro: string | undefined,
    cidade: string | undefined,
    limit: number,
  ): Promise<PopularService[]> {
    return this.homeRepository.listRecommendations({ bairro, cidade, limit });
  }

  async getProfessionals(limit: number): Promise<Professional[]> {
    return this.homeRepository.listProfessionals(limit);
  }
}
