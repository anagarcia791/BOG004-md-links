// CommonJS Modules para: node method process y traer función mdLinks de md-links.js
const process = require('process');
const mdLinks = require('./md-links');

// node methods process

// captura de argumentos de terminal
const terminalArg = process.argv;

// Se invoca la función mdLinks
mdLinks(terminalArg);
