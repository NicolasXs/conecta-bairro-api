import { Elysia, t } from "elysia";
import { ServiceController } from "../controllers/service.controller";
import { requireAuth } from "../lib/auth";
import {
  deleteServiceResponseSchema,
  errorResponseSchema,
  protectedRouteDetail,
  serviceIdParamsSchema,
  serviceListQuerySchema,
  serviceSchema,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

const priceField = t.Optional(t.Union([t.Number({ exclusiveMinimum: 0 }), t.Null()]));

const serviceCreateBody = t.Object({
  category: t.String({ minLength: 2, maxLength: 80 }),
  bairro: t.String({ minLength: 2, maxLength: 120 }),
  title: t.String({ minLength: 2, maxLength: 120 }),
  description: t.String({ minLength: 2, maxLength: 500 }),
  price: priceField,
});

const serviceUpdateBody = t.Object({
  category: t.Optional(t.String({ minLength: 2, maxLength: 80 })),
  bairro: t.Optional(t.String({ minLength: 2, maxLength: 120 })),
  title: t.Optional(t.String({ minLength: 2, maxLength: 120 })),
  description: t.Optional(t.String({ minLength: 2, maxLength: 500 })),
  price: priceField,
});

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
        const service = await serviceController.create(actor.id, body);
        set.status = 201;
        return service;
      },
      {
        body: serviceCreateBody,
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
            "Permite que um usuário autenticado publique um novo serviço na plataforma.",
        },
      },
    )
    .put(
      "/services/:id",
      async ({ params, headers, body }) => {
        const actor = await requireAuth(headers.authorization);
        return serviceController.update(params.id, body, actor.id);
      },
      {
        params: serviceIdParamsSchema,
        body: serviceUpdateBody,
        response: {
          200: serviceSchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Services"],
          operationId: "updateService",
          summary: "Atualizar serviço",
          description:
            "Atualiza os dados de um serviço publicado pelo próprio usuário autenticado.",
        },
      },
    )
    .delete(
      "/services/:id",
      async ({ params, headers }) => {
        const actor = await requireAuth(headers.authorization);
        return serviceController.delete(params.id, actor.id);
      },
      {
        params: serviceIdParamsSchema,
        response: {
          200: deleteServiceResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Services"],
          operationId: "deleteService",
          summary: "Apagar serviço",
          description: "Remove permanentemente um serviço publicado pelo próprio usuário autenticado.",
        },
      },
    );
