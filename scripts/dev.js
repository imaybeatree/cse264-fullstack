const { spawn, spawnSync } = require("child_process");

// generate prisma client on npm run dev before starting frontend + backend
function runCommand(name, command, args, cwd) {
  const proc = spawn(command, args, {
    cwd,
    shell: true,
  });

  proc.stdout.on("data", (data) => {
    process.stdout.write(`[${name}] ${data}`);
  });

  proc.stderr.on("data", (data) => {
    process.stderr.write(`[${name}] ${data}`);
  });

  proc.on("close", (code) => {
    console.log(`[${name}] exited with code ${code}`);
  });
}

console.log("[prisma] generating client...");
const result = spawnSync("npx", ["prisma", "generate"], {
  cwd: ".",
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.error("[prisma] generate failed");
  process.exit(result.status);
}

// start servers after prisma finishes
runCommand("backend", "npm", ["run", "dev"], "./backend");
runCommand("frontend", "npm", ["run", "dev"], "./frontend");