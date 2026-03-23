import "dotenv/config";
import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { z } from "zod";
import { createApiPlugin } from "./app/api";
import { AppError } from "./domain/errors";
import { openApiDocumentation } from "./app/openapi.schemas";

const app = new Elysia()
  .use(
    openapi({
      documentation: openApiDocumentation,
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    }),
  )
  .use(createApiPlugin())
  .onError(({ error, set }) => {
    if (error instanceof z.ZodError) {
      set.status = 400;
      return {
        code: "VALIDATION_ERROR",
        message: "Erro de validação nos dados enviados.",
        details: error.flatten(),
      };
    }

    if (error instanceof AppError) {
      set.status = error.statusCode;
      return {
        code: error.code,
        message: error.message,
        details: error.details,
      };
    }

    set.status = 500;
    return {
      code: "INTERNAL_SERVER_ERROR",
      message: "Erro interno do servidor.",
    };
  });

export default app;

// Desenvolvimento local: escuta quando executado diretamente
if (import.meta.main) {
  app.listen(3000);
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}
