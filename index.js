const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

const { spawn } = require("node:child_process");
const ls = spawn("node", ["code/1-graph-bfs.js"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

// prompt([
//   {
//     type: "input",
//     name: "Question?",
//     message: "Question?",
//   },
// ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//     child_process.spawn();
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });
