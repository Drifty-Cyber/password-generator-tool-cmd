#!/usr/bin/env node
import { Option, program } from "commander";
import { generate } from "randomstring";
import chalk from "chalk";
import boxen from "boxen";

console.log("Hello from your Password Generating Tool");

const usage = chalk.cyanBright(
  "-l <length> -c <complexity>\n" +
    boxen(chalk.green("\n" + "Generates a random password" + "\n"), {
      padding: 1,
      borderColor: "green",
      dimBorder: true,
    })
);

program
  .name(chalk.magentaBright("random-pw"))
  .usage(usage)
  .addOption(
    new Option("-l, --length <length>", "Length of the password").argParser(
      parseInt
    )
  )
  .addOption(
    new Option(
      "-c, --complexity <complexity>",
      "Complexity level of the password"
    )
      .choices(["weak", "medium", "strong"])
      .default("medium")
  )
  .version("1.0.0")
  .parse();

const options = program.opts();

//REMEMBER - FIRST LOG TO SHOW OPTIONS PASSED BY USER
// console.log(options);

// Commander program initialization...

const { complexity, length } = options;

if (!length) {
  program.help();
}

const complexityMap = {
  weak: "alphabetic",
  medium: "alphanumeric",
  strong: ["alphanumeric", "!@#$%^&*()_"],
};

const password = generate({
  length: length,
  charset: complexityMap[complexity],
  readable: true,
});

// SHOW NEWLY GENERATED PASSWORD
// REMEMBER - SECOND LOG TO SHOW GENERATED PASSWORD

// console.log("Generated password:", password);

const styledPassword = chalk.bold.green(password);

const messageBox = boxen(`Generated password:\n\n ${styledPassword}`, {
  padding: 1,
  borderColor: "green",
  dimBorder: true,
});

console.log(messageBox);
