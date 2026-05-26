import { AppError } from "../domain/errors";
import { verifyJwt } from "./jwt";

export interface RequestActor {
  id: string;
}

export const requireAuth = async (authorizationHeader?: string): Promise<RequestActor> => {
  if (!authorizationHeader) {
    throw new AppError(401, "UNAUTHORIZED", "Header Authorization é obrigatório.");
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError(401, "UNAUTHORIZED", "Formato de token inválido. Use Bearer <token>.");
  }

  const payload = await verifyJwt(token);

  if (!payload.sub) {
    throw new AppError(401, "UNAUTHORIZED", "Token inválido ou expirado.");
  }

  return {
    id: payload.sub,
  };
};
