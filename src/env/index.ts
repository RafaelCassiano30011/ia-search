import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3000),
  ENCRYPTION_IV_LENGTH: z.number().default(16),
  ENCRYPTION_SECRET_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Environment validation error", _env.error);

  throw new Error("Environment validation error");
}

const env = _env.data;

export { env };
