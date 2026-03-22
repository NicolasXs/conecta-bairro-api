import { Elysia } from "elysia";
import { RatingController } from "../controllers/rating.controller";
import { requireAuth } from "../lib/auth";
import {
  createRatingBodySchema,
  errorResponseSchema,
  protectedRouteDetail,
  ratingSchema,
  validationErrorResponseSchema,
  workerIdParamsSchema,
} from "../app/openapi.schemas";

export const ratingRoutes = (ratingController: RatingController) =>
  new Elysia()
    .post(
      "/ratings",
      async ({ headers, body, set }) => {
        const actor = await requireAuth(headers.authorization);
        const rating = await ratingController.create(actor.id, actor.role, body);
        set.status = 201;
        return rating;
      },
      {
        body: createRatingBodySchema,
        response: {
          201: ratingSchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Ratings"],
          operationId: "createRating",
          summary: "Criar avaliação",
          description:
            "Permite que um cliente autenticado avalie um worker com nota de 1 a 5 e comentário opcional.",
        },
      },
    )
    .get(
      "/ratings/:worker_id",
      async ({ params }) => ratingController.listByWorkerId(params.worker_id),
      {
        params: workerIdParamsSchema,
        response: {
          200: ratingSchema.array(),
          400: validationErrorResponseSchema,
        },
        detail: {
          tags: ["Ratings"],
          operationId: "listWorkerRatings",
          summary: "Listar avaliações do worker",
          description:
            "Retorna todas as avaliações registradas para o worker informado no parâmetro da rota.",
        },
      },
    );
