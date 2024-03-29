#!/usr/bin/env node
"use strict";

var inquirer = require('inquirer');
var chalk = require('chalk');

var resume = require('./Resume.json');

var response = chalk.bold.green;

var resumePrompts = {
 type: "list",
 name: "resumeOptions",
 message: "What would you like to know?",
 choices: [...Object.keys(resume), "Exit"]
};

function main() {
 console.log("Hi there, my name is Madelein, welcome to my resume!");
 resumeHandler();
};

function resumeHandler() {
 inquirer.prompt(resumePrompts).then(answer => {
  if (answer.resumeOptions == "Exit") {
   return;
  }
  var option = answer.resumeOptions;
  console.log("-----------------------");
  resume[`${option}`].forEach(info => {
   console.log(response("| => " + info));
  });
  console.log(response("---------------------"));
  // console.log(resume[`${option}`]);
  inquirer
   .prompt({
    type: "list",
    name: "exitBack",
    message: "Go back or Exit?",
    choices: ["Back", "Exit"]
   })
   .then(choice => {
    if (choice.exitBack == "Back") {
     resumeHandler();
    } else {
     return;
    }
   });
 });
}

main();