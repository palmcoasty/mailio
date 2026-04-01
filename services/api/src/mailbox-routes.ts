import type { FastifyInstance } from "fastify";
import {
  buildMailboxSummary,
  enterpriseCapabilities,
  performanceTargets,
  rolePermissions,
  sampleMessagePage
} from "@mailio/shared";
import { createProviderRegistry } from "@mailio/provider-adapters";
import { getDemoSession, requirePermission } from "./auth.js";
import type { AuditService } from "./audit.js";

export async function registerMailboxRoutes(
  app: FastifyInstance,
  audit: AuditService
): Promise<void> {
  const providers = createProviderRegistry();

  app.get("/health", async () => ({
    status: "ok",
    providers: providers.map((provider) => provider.id)
  }));

  app.get("/api/bootstrap", async () => ({
    capabilities: enterpriseCapabilities,
    performanceTargets,
    roles: rolePermissions
  }));

  app.get("/api/mailboxes/:tenantId/:accountId", async (request) => {
    const session = getDemoSession(request);
    requirePermission(session, "mailbox.read", rolePermissions);

    const { tenantId, accountId } = request.params as {
      tenantId: string;
      accountId: string;
    };

    audit.record({
      action: "mailbox.summary_viewed",
      actorId: "system-demo-user",
      tenantId,
      targetId: accountId,
      occurredAt: new Date().toISOString()
    });

    return buildMailboxSummary(tenantId, accountId);
  });

  app.get("/api/messages/:mailboxId", async (request) => {
    const session = getDemoSession(request);
    requirePermission(session, "mailbox.read", rolePermissions);

    const { mailboxId } = request.params as { mailboxId: string };
    const cursor = (request.query as { cursor?: string }).cursor ?? null;

    return {
      mailboxId,
      page: sampleMessagePage(cursor)
    };
  });
}
