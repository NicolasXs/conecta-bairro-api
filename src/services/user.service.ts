import { z } from "zod";
import { AppError } from "../domain/errors";
import { User } from "../domain/entities";
import type { UserRepository } from "../repositories/user.repository";
import { updateUserBodySchema } from "../app/openapi.schemas";

const updateUserSchema = updateUserBodySchema;

type UpdateUserInput = z.infer<typeof updateUserSchema>;

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(userId: string): Promise<Omit<User, "passwordHash">> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "Usuário não encontrado.");
    }

    return this.toSafeUser(user);
  }

  async update(
    userId: string,
    input: unknown,
    actorId: string,
  ): Promise<Omit<User, "passwordHash">> {
    if (userId !== actorId) {
      throw new AppError(403, "FORBIDDEN", "Você só pode atualizar o próprio perfil.");
    }

    const payload = updateUserSchema.parse(input) as UpdateUserInput;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "Usuário não encontrado.");
    }

    const nextPasswordHash = payload.password
      ? await Bun.password.hash(payload.password)
      : user.passwordHash;

    const updatedUser: User = {
      ...user,
      name: payload.name ?? user.name,
      neighborhood: payload.neighborhood ?? user.neighborhood,
      passwordHash: nextPasswordHash,
      updatedAt: new Date(),
    };

    await this.userRepository.update(updatedUser);

    return this.toSafeUser(updatedUser);
  }

  private toSafeUser(user: User): Omit<User, "passwordHash"> {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
