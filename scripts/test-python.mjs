import { spawnSync } from "node:child_process";

const isWindows = process.platform === "win32";
let executable = process.env.PYTHON_EXECUTABLE ?? "python3";
let canRun = true;

if (isWindows && process.env.PYTHON_EXECUTABLE === undefined) {
  const launcher = spawnSync("py", ["-0p"], { encoding: "utf8" });
  const runtimeLine = launcher.stdout
    ?.split(/\r?\n/)
    .find((line) => line.includes("3.12"));
  const runtimePath = runtimeLine
    ?.match(/([A-Za-z]:\\.*?python(?:\.exe)?)\s*$/i)?.[1];

  if (!runtimePath) {
    console.error(
      "Python 3.12 was not found. Set PYTHON_EXECUTABLE to a Python 3.12 executable.",
    );
    process.exitCode = 1;
    canRun = false;
  } else {
    executable = runtimePath;
  }
}

if (canRun) {
  const result = spawnSync(
    executable,
    [
      "-m",
      "unittest",
      "discover",
      "-s",
      "skills/python-engineering/examples",
      "-p",
      "test_*.py",
    ],
    { stdio: "inherit" },
  );

  if (result.error) {
    console.error(`Could not start ${executable}: ${result.error.message}`);
    process.exitCode = 1;
  } else {
    process.exitCode = result.status ?? 1;
  }
}
