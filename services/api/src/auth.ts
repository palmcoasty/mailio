import type { FastifyRequest } from "fastify";
import type { TenantAccount, UserRole } from "@mailio/shared";

export function getDemoSession(request: FastifyRequest): TenantAccount {
  const role = (request.headers["x-mailio-role"] as UserRole | undefined) ?? "tenantAdmin";

  return {
    tenantId: "tenant-acme",
    accountId: "acct-001",
    role,
    mailboxIds: ["primary-inbox", "security-ops"],
    delegatedMailboxIds: ["security-ops"]
  };
}

export function requirePermission(
  account: TenantAccount,
  permission: string,
  permissionMap: Record<UserRole, string[]>
): void {
  const permissions = permissionMap[account.role];

  if (!permissions.includes(permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }
}
