import {
  buildSyncPlan,
  type MailboxConnection,
  type SyncCheckpoint,
  type SyncPlan
} from "@mailio/shared";
import { createProviderRegistry } from "@mailio/provider-adapters";
import type { SyncConfig } from "./config.js";

export type SyncExecution = {
  plan: SyncPlan;
  providerIds: string[];
  checkpoint: SyncCheckpoint;
};

export function planSyncExecution(
  connection: MailboxConnection,
  checkpoint: SyncCheckpoint | null,
  config: SyncConfig
): SyncExecution {
  const providers = createProviderRegistry();
  const plan = buildSyncPlan(connection, checkpoint, config.SYNC_BATCH_SIZE);

  return {
    plan,
    providerIds: providers.map((provider) => provider.id),
    checkpoint:
      checkpoint ??
      ({
        accountId: connection.accountId,
        mailboxId: connection.mailboxId,
        nextCursor: null,
        lastSyncedAt: null,
        backfillStatus: "pending"
      } satisfies SyncCheckpoint)
  };
}
