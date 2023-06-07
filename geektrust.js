const fs = require("fs");
const commandsModule = require('./src/commands');

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) {
    throw err;
  }

  const inputLines = data.toString().split("\n");
  inputLines.forEach((line) => {
    commandsModule.processCommand(line);
  });
});
