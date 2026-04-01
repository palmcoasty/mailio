import test from "node:test";
import assert from "node:assert/strict";
import { buildSyncPlan, demoMailboxConnection } from "./index.js";

test("buildSyncPlan uses incremental mode when checkpoint exists", () => {
  const plan = buildSyncPlan(
    demoMailboxConnection,
    {
      accountId: demoMailboxConnection.accountId,
      mailboxId: demoMailboxConnection.mailboxId,
      nextCursor: "cursor-1",
      lastSyncedAt: new Date().toISOString(),
      backfillStatus: "running"
    },
    250
  );

  assert.equal(plan.mode, "incremental");
  assert.equal(plan.pageSize, 250);
});
