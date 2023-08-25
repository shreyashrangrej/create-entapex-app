#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed To Execute ${command}`, e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];

if (!repoName) {
  rl.question("Enter the project name: ", (name) => {
    rl.close();

    if (!name) {
      console.error("Project name is required.");
      process.exit(1);
    }

    cloneAndInstall(name);
  });
} else {
  cloneAndInstall(repoName);
}

function cloneAndInstall(repoName) {
  const gitCheckoutCommand = `git clone --depth 1 https://github.com/shreyashrangrej/entapex-app ${repoName}`;
  const installDepsCommand = `cd ${repoName} && npm install`;

  console.log(`Cloning the repository with name ${repoName}`);
  const checkOut = runCommand(gitCheckoutCommand);
  if (!checkOut) process.exit(1);

  console.log(`Installing deps for ${repoName}`);
  const installDeps = runCommand(installDepsCommand);
  if (!installDeps) process.exit(1);

  console.log(
    "Congratulations! You are ready. Follow the following command to start: npm run dev"
  );
}