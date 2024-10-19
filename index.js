const inquirer = require("inquirer");
const { spawn } = require("node:child_process");
const config = require("./code/config.json");
const fs = require("fs");
const path = require("path");

const prompt = inquirer.createPromptModule();

const template = `
/*
  desc -
  url - 
  difficulty - 
*/
const INPUT = [];

const fn = (input) => {

};

INPUT.forEach((input) => {
  const result = fn(input);
  console.log(result);
});

`;

const save = (folder, filename, content) => {
  const filePath = path.join(folder, filename);

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log(`Successfully wrote to ${filePath}`);
  });
};

const executeCmd = (cmd, cb) => {
  cmd.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  cmd.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  cmd.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    if (cb) cb();
  });
};

const executeFile = (filename) => {
  const path = `code/${filename}`;
  console.log(`Executing: ${path}`);
  console.log(
    `-----------${Array(path.length)
      .fill(null)
      .map((_) => "-")
      .join("")}`,
  );
  executeCmd(spawn("node", [path]));
};

const createFile = (filename) => {
  const finalFileName = `${config.nextIdx}-${filename.toLowerCase().replaceAll(/\s+/g, "-")}.js`;
  const cmd = spawn("touch", [`code/${finalFileName}`]);
  executeCmd(cmd, () => {
    save("code", finalFileName, template);
    config.nextIdx++;
    config.currentFile = finalFileName;
    config.files.push(finalFileName);
    save("code", "config.json", JSON.stringify(config, undefined, 2));
  });
};

const showPrompt = () => {
  prompt([
    {
      type: "input",
      name: "filename",
      message: "Filename?",
    },
  ])
    .then((answer) => {
      createFile(String(answer["filename"]));
    })
    .catch((error) => {
      console.error(error);
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

const main = () => {
  const args = process.argv[2] || "";
  const [cmd, val] = args.split("=");
  if (cmd === "init") {
    showPrompt();
  } else {
    executeFile(config.currentFile);
  }
};

main();
