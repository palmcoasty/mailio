import test from "node:test";
import assert from "node:assert/strict";
import { demoMailboxConnection } from "@mailio/shared";
import { planSyncExecution } from "./pipeline.js";

test("planSyncExecution starts initial backfill without checkpoint", () => {
  const execution = planSyncExecution(demoMailboxConnection, null, {
    SYNC_BATCH_SIZE: 500,
    SYNC_CONCURRENCY: 8,
    SYNC_RESUME_WINDOW_MINUTES: 30
  });

  assert.equal(execution.plan.mode, "initialBackfill");
  assert.equal(execution.plan.streamAttachments, true);
  assert.ok(execution.providerIds.includes("microsoft365"));
});
