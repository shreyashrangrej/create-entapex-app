#!/usr/bin/env node

const readline = require("readline");
const path = require("path");
const fs = require('fs')

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
  
  console.log(
    "Congratulations! You are ready."
  );
}