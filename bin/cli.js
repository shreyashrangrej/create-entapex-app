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

rl.question("Enter the repository name: ", (repoName) => {
  rl.close();

  if (!repoName) {
    console.error("Repository name is required.");
    process.exit(1);
  }

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
});

// const repoName = process.argv[2];
// const gitCheckoutCommand = `git clone --depth 1 https://github.com/shreyashrangrej/entapex-app ${repoName}`;
// const installDepsCommand = `cd ${repoName} && npm install`;

// console.log(`Cloning the repository with name ${repoName}`);
// const checkOut = runCommand(gitCheckoutCommand);
// if (!checkOut) process.exit(code, 1);

// console.log(`Installing deps for ${repoName}`);
// const installDeps = runCommand(installDepsCommand);
// if (!installDeps) process.exit(code, 1);

// console.log(
//   "Congratulation! You are ready. Follow the following command to start: npm run dev"
// );
