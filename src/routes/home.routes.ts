import { Elysia } from "elysia";
import { HomeController } from "../controllers/home.controller";
import {
  homeQuerySchema,
  popularServiceSchema,
  professionalSchema,
  recommendationsQuerySchema,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

export const homeRoutes = (homeController: HomeController) =>
  new Elysia()
    .get(
      "/home/popular",
      async ({ query }) => homeController.getPopular(query.limit),
      {
        query: homeQuerySchema,
        response: {
          200: popularServiceSchema.array(),
          400: validationErrorResponseSchema,
        },
        detail: {
          tags: ["Home"],
          operationId: "getPopularServices",
          summary: "Serviços populares",
          description:
            "Retorna os serviços cujos prestadores têm as melhores médias e maior número de avaliações. Ideal para a seção de destaques na tela inicial.",
        },
      },
    )
    .get(
      "/home/recommendations",
      async ({ query }) =>
        homeController.getRecommendations(query.bairro, query.cidade, query.limit),
      {
        query: recommendationsQuerySchema,
        response: {
          200: popularServiceSchema.array(),
          400: validationErrorResponseSchema,
        },
        detail: {
          tags: ["Home"],
          operationId: "getRecommendations",
          summary: "Recomendações",
          description:
            "Retorna serviços recomendados filtrando por bairro e/ou cidade do prestador. Quando nenhum filtro é fornecido, retorna os mais bem avaliados da plataforma.",
        },
      },
    )
    .get(
      "/home/professionals",
      async ({ query }) => homeController.getProfessionals(query.limit),
      {
        query: homeQuerySchema,
        response: {
          200: professionalSchema.array(),
          400: validationErrorResponseSchema,
        },
        detail: {
          tags: ["Home"],
          operationId: "getProfessionals",
          summary: "Profissionais",
          description:
            "Retorna prestadores de serviços que possuem ao menos um serviço publicado, ordenados por média de avaliações e quantidade de avaliações recebidas.",
        },
      },
    );
