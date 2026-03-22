import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getProfile(userId: string) {
    return this.userService.getById(userId);
  }

  async updateProfile(userId: string, body: unknown, actorId: string) {
    return this.userService.update(userId, body, actorId);
  }
}
