import { AppError } from "../domain/errors";

interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const toBase64Url = (input: string): string => Buffer.from(input).toString("base64url");

const fromBase64Url = (input: string): string => Buffer.from(input, "base64url").toString("utf8");

const getSecret = (): string => {
  const secret =
    Bun.env.JWT_SECRET ??
    Bun.env.BETTER_AUTH_SECRET ??
    process.env.JWT_SECRET ??
    process.env.BETTER_AUTH_SECRET;

  if (!secret) {
    throw new AppError(
      500,
      "MISSING_JWT_SECRET",
      "Defina JWT_SECRET ou BETTER_AUTH_SECRET no ambiente.",
    );
  }

  return secret;
};

const createSignature = async (data: string, secret: string): Promise<string> => {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(data));
  return Buffer.from(new Uint8Array(signature)).toString("base64url");
};

export const signJwt = async (subject: string, role: string): Promise<string> => {
  const secret = getSecret();
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "HS256", typ: "JWT" };
  const payload: JwtPayload = {
    sub: subject,
    role,
    iat: now,
    exp: now + 60 * 60 * 24,
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await createSignature(unsignedToken, secret);

  return `${unsignedToken}.${signature}`;
};

export const verifyJwt = async (token: string): Promise<JwtPayload> => {
  const secret = getSecret();
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new AppError(401, "INVALID_TOKEN", "Token inválido.");
  }

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = await createSignature(unsignedToken, secret);

  if (signature !== expectedSignature) {
    throw new AppError(401, "INVALID_TOKEN", "Token inválido.");
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload)) as JwtPayload;
  const now = Math.floor(Date.now() / 1000);

  if (payload.exp <= now) {
    throw new AppError(401, "EXPIRED_TOKEN", "Token expirado.");
  }

  return payload;
};
