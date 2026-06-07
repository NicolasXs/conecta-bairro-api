import { Elysia } from "elysia";
import { CategoryController } from "../controllers/category.controller";
import { requireAuth } from "../lib/auth";
import {
  categoryIdParamsSchema,
  categorySchema,
  createCategoryBodySchema,
  deleteCategoryResponseSchema,
  errorResponseSchema,
  protectedRouteDetail,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

export const categoryRoutes = (categoryController: CategoryController) =>
  new Elysia()
    .get("/categories", async () => categoryController.list(), {
      response: {
        200: categorySchema.array(),
      },
      detail: {
        tags: ["Categories"],
        operationId: "listCategories",
        summary: "Listar categorias",
        description:
          "Retorna o catálogo completo de categorias de serviços disponíveis para classificação e filtro.",
      },
    })
    .post(
      "/categories",
      async ({ headers, body, set }) => {
        await requireAuth(headers.authorization);
        const category = await categoryController.create(body.name);
        set.status = 201;
        return category;
      },
      {
        body: createCategoryBodySchema,
        response: {
          201: categorySchema,
          400: validationErrorResponseSchema,
          401: errorResponseSchema,
          409: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Categories"],
          operationId: "createCategory",
          summary: "Criar categoria",
          description: "Cria uma nova categoria de serviço. Requer autenticação.",
        },
      },
    )
    .delete(
      "/categories/:id",
      async ({ headers, params }) => {
        await requireAuth(headers.authorization);
        return categoryController.delete(params.id);
      },
      {
        params: categoryIdParamsSchema,
        response: {
          200: deleteCategoryResponseSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
        detail: {
          ...protectedRouteDetail,
          tags: ["Categories"],
          operationId: "deleteCategory",
          summary: "Remover categoria",
          description: "Remove uma categoria existente. Requer autenticação.",
        },
      },
    );
