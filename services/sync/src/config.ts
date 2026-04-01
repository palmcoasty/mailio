import { z } from "zod";

const envSchema = z.object({
  SYNC_BATCH_SIZE: z.coerce.number().int().positive().default(500),
  SYNC_CONCURRENCY: z.coerce.number().int().positive().default(8),
  SYNC_RESUME_WINDOW_MINUTES: z.coerce.number().int().positive().default(30)
});

export type SyncConfig = z.infer<typeof envSchema>;

export function loadSyncConfig(env: NodeJS.ProcessEnv = process.env): SyncConfig {
  return envSchema.parse(env);
}
