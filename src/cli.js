#!/usr/bin/env node

// CommonJS Modules para: node method | mdlinks
const process = require('process');
const mdlinks = require('./index');
const finalOutput = require('./utils');

// argumentos de uso cuando se ejecuta mdlinks sin consola
// const pathMd = './folder-test/prueba.md';
// const optionsMd = { validate: true, stats: true };

// argumentos de uso cuando se ejecuta mdlinks desde consola
const pathMd = process.argv[2];
const optionsMd = {};

if (process.argv.includes('--validate')) {
  optionsMd.validate = true;
}

if (process.argv.includes('--stats')) {
  optionsMd.stats = true;
}

// array de argumentos para evaluacion de options
const terminalArg = [pathMd];

if (optionsMd.validate === true) {
  terminalArg.push('--validate');
}

if (optionsMd.stats === true) {
  terminalArg.push('--stats');
}

// se invoca función mdLinks
mdlinks(pathMd, optionsMd)
  .then((result) => {
    finalOutput(terminalArg, result);
  })
  .catch((error) => {
    console.log(error);
  });
