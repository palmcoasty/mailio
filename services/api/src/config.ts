import { z } from "zod";

const envSchema = z.object({
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(4000),
  APP_ORIGIN: z.string().default("http://localhost:3000"),
  SESSION_SECRET: z.string().min(32).default("replace-this-local-session-secret-32"),
  AUDIT_SINK: z.enum(["stdout", "noop"]).default("stdout"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  DATABASE_URL: z.string().default("postgres://mailio:mailio@localhost:5432/mailio"),
  OPENSEARCH_URL: z.string().default("http://localhost:9200")
});

export type AppConfig = z.infer<typeof envSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return envSchema.parse(env);
}
