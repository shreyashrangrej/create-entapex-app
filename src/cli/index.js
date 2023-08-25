#!/usr/bin/env node

const readline = require("readline");
const path = require("path");
const fs = require("fs");
const spawn = require('cross-spawn');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const projectName = process.argv[2];

if (!projectName) {
  rl.question("Enter the project name: ", (name) => {
    rl.close();

    if (!name) {
      console.error("Project name is required.");
      process.exit(1);
    }

    scafold(name);
  });
} else {
  scafold(projectName);
}

function scafold(projectName) {
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  fs.mkdirSync(projectDir, { recursive: true });

  const templateDir = path.resolve(__dirname, "../template");
  fs.cpSync(templateDir, projectDir, { recursive: true });

  fs.renameSync(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );

  fs.renameSync(
    path.join(projectDir, "_eslintrc.json"),
    path.join(projectDir, ".eslintrc.json")
  );

  fs.renameSync(
    path.join(projectDir, "_env.example"),
    path.join(projectDir, ".env.example")
  );

  const projectPackageJson = require(path.join(projectDir, 'package.json'));

  projectPackageJson.name = projectName;

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
  );

  spawn.sync('npm', ['install'], { stdio: 'inherit' });

  console.log("Congratulations! You are ready.");
}
