import test from "node:test";
import assert from "node:assert/strict";
import { createProviderRegistry } from "./index.js";

test("createProviderRegistry includes all provider families", () => {
  const providers = createProviderRegistry();

  assert.deepEqual(
    providers.map((provider) => provider.id),
    ["imap", "microsoft365", "gmail"]
  );
});
