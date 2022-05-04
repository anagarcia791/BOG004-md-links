#!/usr/bin/env node

// CommonJS Modules para: node method | mdlinks | chalk
const process = require('process');
const mdlinks = require('./index');
const finalOutput = require('./utils');

// funcion mdLinks
const cliOutput = () => {
  // captura de argumentos de terminal
  const terminalArg = process.argv;

  // se invoca función mdLinks
  mdlinks(terminalArg)
    .then((result) => {
      finalOutput(terminalArg, result);
    })
    .catch((error) => {
      console.log(error);
    });
};

// se invoca función cliOutput
cliOutput();
