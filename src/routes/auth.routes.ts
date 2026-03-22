import { Elysia } from "elysia";
import { AuthController } from "../controllers/auth.controller";
import {
  authResponseSchema,
  errorResponseSchema,
  loginBodySchema,
  registerBodySchema,
  validationErrorResponseSchema,
} from "../app/openapi.schemas";

export const authRoutes = (authController: AuthController) =>
  new Elysia()
    .post(
      "/auth/register",
      async ({ body, set }) => {
        const result = await authController.register(body);
        set.status = 201;
        return result;
      },
      {
        body: registerBodySchema,
        response: {
          201: authResponseSchema,
          400: validationErrorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
        },
        detail: {
          tags: ["Auth"],
          operationId: "registerUser",
          summary: "Registrar usuário",
          description:
            "Cria uma nova conta do tipo worker ou client e retorna imediatamente um token JWT junto com os dados públicos do usuário.",
        },
      },
    )
    .post("/auth/login", async ({ body }) => authController.login(body), {
      body: loginBodySchema,
      response: {
        200: authResponseSchema,
        400: validationErrorResponseSchema,
        401: errorResponseSchema,
        500: errorResponseSchema,
      },
      detail: {
        tags: ["Auth"],
        operationId: "loginUser",
        summary: "Autenticar usuário",
        description:
          "Valida e-mail e senha do usuário e retorna um JWT para acesso às rotas protegidas da API.",
      },
    });
