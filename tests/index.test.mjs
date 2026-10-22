import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as api from "../dist/index.js";
test("values booleans and positionals", () => {
  const r = api.parseArgs(["--name=demo", "--verbose", "file"], {
    name: "string",
    verbose: "boolean",
  });
  assert.equal(r.options.name, "demo");
  assert.equal(r.options.verbose, true);
  assert.deepEqual(r.positionals, ["file"]);
});
test("terminator", () =>
  assert.deepEqual(api.parseArgs(["--", "--literal"], {}).positionals, [
    "--literal",
  ]));
test("invalid option and missing value", () => {
  assert.throws(() => api.parseArgs(["--x"], {}));
  assert.throws(() => api.parseArgs(["--name"], { name: "string" }));
  assert.equal(
    api.parseArgs(["--verbose=false"], { verbose: "boolean" }).options.verbose,
    false,
  );
});
