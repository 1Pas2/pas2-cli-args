import { parseArgs } from "../dist/index.js";
console.log(
  parseArgs(["--name=demo", "--verbose", "file.txt"], {
    name: "string",
    verbose: "boolean",
  }),
);
