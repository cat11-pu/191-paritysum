import assert from "node:assert";
import { parityOf } from "../classify.js";
import { groupSums } from "../sums.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("parityOf returns text", () => {
  assert.strictEqual(typeof parityOf(4), "string");
});

check("groupSums returns parities", () => {
  assert.ok(Array.isArray(groupSums([1, 2]).parities));
});

check("groupSums returns even sum", () => {
  assert.strictEqual(typeof groupSums([1, 2]).even_sum, "number");
});

check("render counts even", () => {
  assert.strictEqual(typeof render({ values: [1, 2] }).even_count, "number");
});

check("render exposes total", () => {
  assert.strictEqual(typeof render({ values: [1, 2] }).total, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
