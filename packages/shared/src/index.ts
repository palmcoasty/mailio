export type UserRole = "tenantAdmin" | "supportAgent" | "mailUser";

export type AuditEvent = {
  action: string;
  actorId: string;
  tenantId: string;
  targetId: string;
  occurredAt: string;
};

export type MailProviderKind = "imap" | "microsoft365" | "gmail";

export type MailboxConnection = {
  tenantId: string;
  accountId: string;
  mailboxId: string;
  provider: MailProviderKind;
  mailboxAddress: string;
};

export type ProviderCredentialShape =
  | {
      provider: "imap";
      encryptedSecretRef: string;
      username: string;
      host: string;
      port: number;
      tls: boolean;
    }
  | {
      provider: "microsoft365" | "gmail";
      encryptedSecretRef: string;
      tenantHint?: string;
      scopes: string[];
    };

export type TenantAccount = {
  tenantId: string;
  accountId: string;
  role: UserRole;
  mailboxIds: string[];
  delegatedMailboxIds: string[];
};

export type VaultSecretDescriptor = {
  ref: string;
  algorithm: "aes-256-gcm";
  rotationDays: number;
  owner: "tenant" | "system";
};

export type HtmlRenderPolicy = {
  allowRemoteImages: boolean;
  sanitizeCss: boolean;
  stripScripts: boolean;
  rewriteLinks: boolean;
};

export type SyncCheckpoint = {
  accountId: string;
  mailboxId: string;
  nextCursor: string | null;
  lastSyncedAt: string | null;
  backfillStatus: "pending" | "running" | "complete";
};

export type SyncPlan = {
  mode: "initialBackfill" | "incremental";
  mailboxId: string;
  pageSize: number;
  streamAttachments: boolean;
  shardKey: string;
};

export const rolePermissions: Record<UserRole, string[]> = {
  tenantAdmin: [
    "mailbox.read",
    "mailbox.write",
    "mailbox.delegate",
    "tenant.audit.read",
    "tenant.settings.write"
  ],
  supportAgent: ["mailbox.read", "mailbox.delegate", "tenant.audit.read"],
  mailUser: ["mailbox.read", "mailbox.write"]
};

export const enterpriseCapabilities = [
  "Shared mailbox governance",
  "Saved search presets",
  "Delegation and impersonation controls",
  "Bulk triage actions",
  "Streaming attachment previews",
  "Role-aware admin surfaces",
  "High-density mailbox layouts",
  "Audit-visible operations"
] as const;

export const performanceTargets = [
  { label: "Concurrent users", target: "500+" },
  { label: "Indexed emails", target: "1M+" },
  { label: "Folder open latency", target: "< 1.5s warm" }
] as const;

export const demoMailboxMetrics = [
  { label: "Tenants online", value: "118" },
  { label: "Active sessions", value: "432" },
  { label: "Queued sync jobs", value: "27" },
  { label: "OpenSearch shards", value: "14" }
] as const;

export const demoMailboxConnection: MailboxConnection = {
  tenantId: "tenant-acme",
  accountId: "acct-001",
  mailboxId: "mailbox-primary",
  provider: "microsoft365",
  mailboxAddress: "ops@acme.example"
};

export const defaultHtmlRenderPolicy: HtmlRenderPolicy = {
  allowRemoteImages: false,
  sanitizeCss: true,
  stripScripts: true,
  rewriteLinks: true
};

export const defaultVaultPolicy: VaultSecretDescriptor = {
  ref: "vault://mailio/local/default",
  algorithm: "aes-256-gcm",
  rotationDays: 30,
  owner: "system"
};

export function buildMailboxSummary(tenantId: string, accountId: string) {
  return {
    tenantId,
    accountId,
    mailboxes: [
      {
        mailboxId: "primary-inbox",
        unreadCount: 284,
        messageCount: 145328,
        delegates: 8,
        lastSyncAt: new Date().toISOString()
      },
      {
        mailboxId: "security-ops",
        unreadCount: 32,
        messageCount: 802144,
        delegates: 21,
        lastSyncAt: new Date().toISOString()
      }
    ]
  };
}

export function sampleMessagePage(cursor: string | null) {
  return {
    nextCursor: cursor === null ? "cursor-2" : null,
    items: [
      {
        id: "msg-1001",
        subject: "Quarterly security review",
        from: "ciso@acme.example",
        hasAttachments: true,
        receivedAt: "2026-03-31T10:00:00.000Z"
      },
      {
        id: "msg-1002",
        subject: "Mailbox delegation approvals",
        from: "admin@acme.example",
        hasAttachments: false,
        receivedAt: "2026-03-31T09:41:00.000Z"
      }
    ]
  };
}

export function buildSyncPlan(
  connection: MailboxConnection,
  checkpoint: SyncCheckpoint | null,
  pageSize: number
): SyncPlan {
  return {
    mode: checkpoint?.lastSyncedAt ? "incremental" : "initialBackfill",
    mailboxId: connection.mailboxId,
    pageSize,
    streamAttachments: true,
    shardKey: `${connection.tenantId}:${connection.accountId}:${connection.mailboxId}`
  };
}
