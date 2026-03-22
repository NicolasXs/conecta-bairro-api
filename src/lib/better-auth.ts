import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins/bearer";
import { AppError } from "../domain/errors";

const getAuthSecret = (): string => {
  const secret =
    Bun.env.BETTER_AUTH_SECRET ??
    Bun.env.JWT_SECRET ??
    process.env.BETTER_AUTH_SECRET ??
    process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError(
      500,
      "MISSING_AUTH_SECRET",
      "Defina BETTER_AUTH_SECRET (ou JWT_SECRET) no ambiente.",
    );
  }

  return secret;
};

const getBaseUrl = (): string => {
  const baseUrl = Bun.env.BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL;

  if (baseUrl) {
    return baseUrl;
  }

  const port = Bun.env.PORT ?? process.env.PORT ?? "3000";
  return `http://localhost:${port}`;
};

export const auth = betterAuth({
  secret: getAuthSecret(),
  baseURL: getBaseUrl(),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
      },
      neighborhood: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  plugins: [bearer()],
});
