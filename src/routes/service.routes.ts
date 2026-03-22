import { Elysia } from "elysia";
import { ServiceController } from "../controllers/service.controller";
import { requireAuth } from "../lib/auth";
import {
  errorResponseSchema,
  protectedRouteDetail,
  serviceCreateBodySchema,
  serviceListQuerySchema,
  serviceSchema,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

export const serviceRoutes = (serviceController: ServiceController) =>
  new Elysia()
    .get("/services", async ({ query }) => serviceController.list(query), {
      query: serviceListQuerySchema,
      response: {
        200: serviceSchema.array(),
        400: validationErrorResponseSchema,
      },
      detail: {
        tags: ["Services"],
        operationId: "listServices",
        summary: "Listar serviços",
        description:
          "Lista serviços publicados por workers. Os filtros de categoria e bairro são opcionais e podem ser combinados na mesma requisição.",
      },
    })
    .post(
      "/services",
      async ({ headers, body, set }) => {
        const actor = await requireAuth(headers.authorization);
        const service = await serviceController.create(actor.id, actor.role, body);
        set.status = 201;
        return service;
      },
      {
        body: serviceCreateBodySchema,
        response: {
          201: serviceSchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Services"],
          operationId: "createService",
          summary: "Publicar serviço",
          description:
            "Permite que um usuário autenticado com papel worker publique um novo serviço na plataforma.",
        },
      },
    );
