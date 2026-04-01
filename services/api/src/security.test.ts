import test from "node:test";
import assert from "node:assert/strict";
import { loadConfig } from "./config.js";

test("loadConfig provides secure defaults", () => {
  const config = loadConfig({
    SESSION_SECRET: "12345678901234567890123456789012"
  });

  assert.equal(config.API_PORT, 4000);
  assert.equal(config.AUDIT_SINK, "stdout");
});
