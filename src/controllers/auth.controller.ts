import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(body: unknown) {
    return this.authService.register(body);
  }

  async login(body: unknown) {
    return this.authService.login(body);
  }
}
