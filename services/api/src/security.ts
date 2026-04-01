import type { FastifyInstance } from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import sensible from "@fastify/sensible";
import type { AppConfig } from "./config.js";

export async function registerSecurity(
  app: FastifyInstance,
  config: AppConfig
): Promise<void> {
  await app.register(sensible);
  await app.register(cookie, {
    secret: config.SESSION_SECRET,
    hook: "onRequest"
  });
  await app.register(cors, {
    origin: config.APP_ORIGIN,
    credentials: true
  });
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"]
      }
    }
  });
  await app.register(rateLimit, {
    max: 200,
    timeWindow: "1 minute",
    errorResponseBuilder() {
      return {
        error: "rate_limit_exceeded",
        message: "Too many requests"
      };
    }
  });
}
