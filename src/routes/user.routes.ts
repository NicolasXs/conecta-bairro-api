import { Elysia } from "elysia";
import { UserController } from "../controllers/user.controller";
import { requireAuth } from "../lib/auth";
import {
  errorResponseSchema,
  protectedRouteDetail,
  safeUserSchema,
  updateUserBodySchema,
  userIdParamsSchema,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

export const userRoutes = (userController: UserController) =>
  new Elysia()
    .get("/users/:id", async ({ params }) => userController.getProfile(params.id), {
      params: userIdParamsSchema,
      response: {
        200: safeUserSchema,
        400: validationErrorResponseSchema,
        404: errorResponseSchema,
      },
      detail: {
        tags: ["Users"],
        operationId: "getUserProfile",
        summary: "Obter perfil do usuário",
        description:
          "Retorna os dados públicos do usuário identificado pelo parâmetro de rota. O hash de senha nunca é exposto.",
      },
    })
    .put(
      "/users/:id",
      async ({ params, headers, body }) => {
        const actor = await requireAuth(headers.authorization);
        return userController.updateProfile(params.id, body, actor.id);
      },
      {
        params: userIdParamsSchema,
        body: updateUserBodySchema,
        response: {
          200: safeUserSchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Users"],
          operationId: "updateUserProfile",
          summary: "Atualizar perfil do usuário",
          description:
            "Atualiza os dados do próprio usuário autenticado. O identificador da rota deve corresponder ao usuário presente no token JWT.",
        },
      },
    );
