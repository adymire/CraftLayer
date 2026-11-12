import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateRepository } from "./index.js";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const errors = await validateRepository(repositoryRoot);

if (errors.length > 0) {
  console.error("CraftLayer validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log("CraftLayer repository validation passed.");
}
