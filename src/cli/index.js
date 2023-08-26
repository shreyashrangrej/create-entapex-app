#!/usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import fs from "fs";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

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

function scafold(projectName) {
  // Create Project folder
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  fs.mkdirSync(projectDir, { recursive: true });
  console.log(`Project folder created with name ${projectName}`);

  //Copy files from template into the created folder
  console.log(`Scafodling the project: ${projectName}`);
  const scriptDirectory = __dirname;
  // Construct the path to the template directory
  const templateDir = path.join(scriptDirectory, "..", "template");
  fs.cpSync(templateDir, projectDir, { recursive: true });
  console.log(`Scafolding successful!`);

  //rename the dot files
  const filesToRename = ["_gitignore", "_eslintrc.json", "_env.example"];
  filesToRename.forEach((file) => {
    fs.renameSync(
      path.join(projectDir, file),
      path.join(projectDir, `.${file}`)
    );
    console.log(`${file} renamed to .${file}`);
  });
  console.log("Updating the package.json");

  //changing the package.json
  const projectPackageJson = require(path.join(projectDir, "package.json"));
  projectPackageJson.name = projectName;
  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(projectPackageJson, null, 2)
  );
  console.log("package.json update successfully");

  console.log("Congratulations! You are ready.");
}
