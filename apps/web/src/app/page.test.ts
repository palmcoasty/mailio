import test from "node:test";
import assert from "node:assert/strict";
import { enterpriseCapabilities } from "@mailio/shared";

test("enterprise capabilities expose dense enterprise features", () => {
  assert.ok(enterpriseCapabilities.includes("Bulk triage actions"));
});
