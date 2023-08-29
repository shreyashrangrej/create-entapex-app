#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";

const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));

console.log(__filename);

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
  },
];

inquirer.prompt(QUESTIONS).then((answers) => {
  console.log(answers);
});
