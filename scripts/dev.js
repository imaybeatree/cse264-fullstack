const { spawn } = require("child_process");

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

// backend
runCommand("backend", "npm", ["run", "dev"], "./backend");

// frontend
runCommand("frontend", "npm", ["run", "dev"], "./frontend");