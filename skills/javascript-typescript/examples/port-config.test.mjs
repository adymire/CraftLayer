import assert from "node:assert/strict";
import test from "node:test";
import { parsePort } from "./port-config.mjs";

test("parses a valid port", () => {
  assert.equal(parsePort("3000"), 3000);
});

test("rejects missing, non-numeric, and unsafe port values", () => {
  for (const value of [undefined, "", "0", "-1", "3.5", "1e3", "65536"]) {
    assert.throws(() => parsePort(value));
  }
});
