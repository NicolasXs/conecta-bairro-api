import { Elysia } from "elysia";
import { MediaController } from "../controllers/media.controller";
import { requireAuth } from "../lib/auth";
import {
  deleteMediaResponseSchema,
  errorResponseSchema,
  mediaPhotoSchema,
  photoIdParamsSchema,
  protectedRouteDetail,
  uploadMediaBodySchema,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

export const mediaRoutes = (mediaController: MediaController) =>
  new Elysia()
    .post(
      "/media/upload",
      async ({ headers, body, set }) => {
        const actor = await requireAuth(headers.authorization);
        const photo = await mediaController.upload(actor.id, actor.role, body);
        set.status = 201;
        return photo;
      },
      {
        body: uploadMediaBodySchema,
        response: {
          201: mediaPhotoSchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Media"],
          operationId: "uploadPortfolioPhoto",
          summary: "Adicionar foto ao portfólio",
          description:
            "Registra uma nova foto de portfólio para o worker autenticado a partir de uma URL pública da imagem.",
        },
      },
    )
    .delete(
      "/media/:photo_id",
      async ({ headers, params }) => {
        const actor = await requireAuth(headers.authorization);
        return mediaController.delete(params.photo_id, actor.id);
      },
      {
        params: photoIdParamsSchema,
        response: {
          200: deleteMediaResponseSchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Media"],
          operationId: "deletePortfolioPhoto",
          summary: "Remover foto do portfólio",
          description:
            "Remove uma foto do portfólio pertencente ao worker autenticado. A operação só é permitida ao dono da foto.",
        },
      },
    );
