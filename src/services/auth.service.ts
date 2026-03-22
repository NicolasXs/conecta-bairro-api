import { z } from "zod";
import { AppError } from "../domain/errors";
import { User, UserRole } from "../domain/entities";
import { createId } from "../lib/id";
import { signJwt } from "../lib/jwt";
import type { UserRepository } from "../repositories/user.repository";
import { loginBodySchema, registerBodySchema } from "../app/openapi.schemas";

const registerSchema = registerBodySchema.extend({
  email: z.email().transform((value) => value.trim().toLowerCase()),
});

const loginSchema = loginBodySchema.extend({
  email: z.email().transform((value) => value.trim().toLowerCase()),
});

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: unknown): Promise<{ token: string; user: Omit<User, "passwordHash"> }> {
    const payload = registerSchema.parse(input) as RegisterInput;
    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError(409, "EMAIL_ALREADY_IN_USE", "Já existe um usuário com este e-mail.");
    }

    const now = new Date();
    const passwordHash = await Bun.password.hash(payload.password);
    const user: User = {
      id: createId(),
      name: payload.name,
      email: payload.email,
      role: payload.role as UserRole,
      neighborhood: payload.neighborhood,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    };

    const token = await signJwt(user.id, user.role);
    const createdUser = await this.userRepository.create(user);

    return {
      token,
      user: this.toSafeUser(createdUser),
    };
  }

  async login(input: unknown): Promise<{ token: string; user: Omit<User, "passwordHash"> }> {
    const payload = loginSchema.parse(input) as LoginInput;
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Credenciais inválidas.");
    }

    const passwordMatches = await Bun.password.verify(payload.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Credenciais inválidas.");
    }

    const token = await signJwt(user.id, user.role);

    return {
      token,
      user: this.toSafeUser(user),
    };
  }

  private toSafeUser(user: User): Omit<User, "passwordHash"> {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}

export type AuthenticatedUser = {
  id: string;
  role: UserRole;
};
