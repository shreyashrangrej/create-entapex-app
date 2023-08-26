#!/usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

const copyFile = promisify(fs.copyFile);
const copyDir = async (src, dest) => {
  try {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying template files: ${err}`);
    process.exit(1);
  }
};

if (!projectName) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the project name:",
        validate: function (input) {
          if (!input) {
            return "Project name is required.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      scafold(answers.name);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else {
  scafold(projectName);
}

async function scafold(projectName) {
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  fs.mkdirSync(projectDir, { recursive: true });

  console.log(`Project folder created with name ${projectName}`);

  console.log(`Scafodling the project: ${projectName}`);

  // Use path.sep to ensure the correct path separator for the current platform
  // const templateDir = path.resolve(__dirname, "..", "template");

  // // Copy template files to the project directory
  // try {
  //   fs.copyFileSync(templateDir, projectDir, { recursive: true });
  // } catch (err) {
  //   console.error(`Error copying template files: ${err}`);
  //   process.exit(1);
  // }
  // Use path.sep to ensure the correct path separator for the current platform
  const templateDir = path.resolve(__dirname, "..", "template");

  // Copy template files to the project directory
  await copyDir(templateDir, projectDir);

  console.log(`Scafolding successful!`);

  const filesToRename = ["_gitignore", "_eslintrc.json", "_env.example"];

  filesToRename.forEach((file) => {
    fs.renameSync(
      path.join(projectDir, file),
      path.join(projectDir, `.${file}`)
    );

    console.log(`${file} renamed to .${file}`);
  });

  console.log("Updating the package.json");

  const projectPackageJson = require(path.join(projectDir, "package.json"));

  projectPackageJson.name = projectName;

  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(projectPackageJson, null, 2)
  );

  console.log("package.json update successfully");

  console.log("Congratulations! You are ready.");
}
