import { HomeService } from "../services/home.service";

export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  async getPopular(limit: number) {
    return this.homeService.getPopular(limit);
  }

  async getRecommendations(bairro: string | undefined, cidade: string | undefined, limit: number) {
    return this.homeService.getRecommendations(bairro, cidade, limit);
  }

  async getProfessionals(limit: number) {
    return this.homeService.getProfessionals(limit);
  }
}
