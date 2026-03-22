import { Elysia } from "elysia";
import { CategoryController } from "../controllers/category.controller";
import { categorySchema } from "../app/openapi.schemas";

export const categoryRoutes = (categoryController: CategoryController) =>
  new Elysia().get("/categories", async () => categoryController.list(), {
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
  });
