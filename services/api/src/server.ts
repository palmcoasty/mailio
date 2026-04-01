import Fastify from "fastify";
import { AuditService } from "./audit.js";
import { loadConfig } from "./config.js";
import { registerMailboxRoutes } from "./mailbox-routes.js";
import { registerSecurity } from "./security.js";

async function start(): Promise<void> {
  const config = loadConfig();
  const app = Fastify({
    logger: true,
    trustProxy: true
  });

  const audit = new AuditService(config);

  await registerSecurity(app, config);
  await registerMailboxRoutes(app, audit);

  await app.listen({
    host: config.API_HOST,
    port: config.API_PORT
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
