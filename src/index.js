#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { input, select } from "@inquirer/prompts";
import confirm from "@inquirer/confirm";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { execSync } from "child_process";

const CURR_DIR = process.cwd();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHOICES = fs.readdirSync(path.join(__dirname, "../templates"));

(async () => {
  let projectName = process.argv[2];

  if (!projectName) {
    // If project name is not provided as an argument, ask the user for it
    const userInput = await input({ message: "Enter name of your project:" });
    projectName = userInput
  }
  // const projectName = await input({ message: "Enter name of your project:" });
  const projectChoice = await select({
    message: "Select project template:",
    choices: CHOICES.map((choice) => ({ name: choice, value: choice })),
  });
  const templatePath = path.join(__dirname, "../templates", projectChoice);
  const tartgetPath = path.join(CURR_DIR, projectName);

  createProject(tartgetPath);
  createDirectoryContents(templatePath, projectName);
  renameFiles(projectName);
  updatePackageName(projectName);

  const initializeGit = await confirm({
    message: "Do you want to initialize Git?",
    initial: true,
  });

  if (initializeGit) {
    console.log("Initializing Git...");
    try {
      execSync("git init", { stdio: "inherit", cwd: tartgetPath });
      console.log(chalk.green("Git initialized."));
    } catch (error) {
      console.error(chalk.red("Git initialization failed:", error.message));
    }
  } else {
    console.log("You chose not to initialize Git.");
  }

  // Ask whether to run npm install
  const runNpmInstall = await confirm({
    message: "Do you want to run 'npm install'?",
    initial: true,
  });

  if (runNpmInstall) {
    console.log("Running 'npm install'...");
    try {
      execSync("npm install", { stdio: "inherit", cwd: tartgetPath });
      console.log(chalk.green("'npm install' completed successfully."));
    } catch (error) {
      console.error(chalk.red("'npm install' failed:", error.message));
    }
  } else {
    console.log("You chose not to run 'npm install'.");
  }

  console.log(chalk.green("Your project is successfully setup!"));
})();

function createProject(projectPath) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return false;
  }
  fs.mkdirSync(projectPath);
  return true;
}

// Copy of content to directory

function createDirectoryContents(templatePath, projectName) {
  const writePath = path.join(CURR_DIR, projectName);
  fs.cpSync(templatePath, writePath, { recursive: true });
}

// Rename dot files

function renameFiles(projectName) {
  const writePath = path.join(CURR_DIR, projectName);
  const fileMappings = [
    { from: "_gitignore", to: ".gitignore" },
    { from: "_env", to: ".env" },
    { from: "_env.example", to: ".env.example" },
    { from: "_eslintrc.json", to: ".eslintrc.json" },
  ];
  console.log("Renaming the files.");
  for (const mapping of fileMappings) {
    const fromPath = path.join(writePath, mapping.from);
    const toPath = path.join(writePath, mapping.to);

    fs.renameSync(fromPath, toPath);
    console.log(`Renamed ${mapping.from} to ${mapping.to}`);
  }
  console.log("Renaming successful.");
}

function updatePackageName(projectName) {
  const packageJsonPath = path.join(CURR_DIR, projectName, "package.json");

  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);

    // Modify the name field to match the project name
    packageJson.name = projectName;

    // Write the modified package.json content back to the file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(`Updated package.json name to '${projectName}'.`);
  } catch (error) {
    console.error("Error updating package.json:", error.message);
  }
}
