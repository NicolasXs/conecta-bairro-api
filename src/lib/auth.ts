import { AppError } from "../domain/errors";
import { UserRole } from "../domain/entities";
import { verifyJwt } from "./jwt";

export interface RequestActor {
  id: string;
  role: UserRole;
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

  const role = payload.role;

  if (role !== "worker" && role !== "client") {
    throw new AppError(401, "UNAUTHORIZED", "Token sem role válida.");
  }

  return {
    id: payload.sub,
    role: role as UserRole,
  };
};
