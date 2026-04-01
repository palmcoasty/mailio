import type { AuditEvent } from "@mailio/shared";
import type { AppConfig } from "./config.js";

export class AuditService {
  constructor(private readonly config: AppConfig) {}

  record(event: AuditEvent): void {
    if (this.config.AUDIT_SINK === "noop") {
      return;
    }

    console.info("[audit]", JSON.stringify(event));
  }
}
