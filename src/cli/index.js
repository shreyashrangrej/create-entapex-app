#!/usr/bin/env node

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const spawn = require("cross-spawn");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  fs.mkdirSync(projectDir, { recursive: true });

  console.log(`Project folder created with name ${projectName}`);

  console.log(`Scafodling the project: ${projectName}`);

  const templateDir = path.resolve(__dirname, "../template");
  fs.cpSync(templateDir, projectDir, { recursive: true });

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
