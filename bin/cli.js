#!/usr/bin/env node

const {execSync} = require("child_process")

const runCommand = command => {
    try{
        execSync(`${command}`, {stdio: "inherit"})
    } catch(e) {
        console.error(`Failed To Execute ${command}`, e)
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/shreyashrangrej/entapex-app ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log(`Cloning the repository with name ${repoName}`);
const checkOut = runCommand(gitCheckoutCommand);
if(!checkOut) process.exit(code, 1);

console.log(`Installing deps for ${repoName}`);
const installDeps = runCommand(installDepsCommand);
if(!installDeps) process.exit(code, 1);

console.log("Congratulation! You are ready. Follow the following command to start")