import { planSyncExecution } from "./pipeline.js";
import { loadSyncConfig } from "./config.js";
import { demoMailboxConnection } from "@mailio/shared";

function run(): void {
  const config = loadSyncConfig();
  const execution = planSyncExecution(demoMailboxConnection, null, config);

  console.info(
    JSON.stringify(
      {
        message: "Mailio sync worker started",
        concurrency: config.SYNC_CONCURRENCY,
        batchSize: config.SYNC_BATCH_SIZE,
        providers: execution.providerIds,
        syncPlan: execution.plan
      },
      null,
      2
    )
  );
}

run();
