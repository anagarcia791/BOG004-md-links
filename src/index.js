//se importa modulo para traer función mdLinks
const mdLinks = require('./md-links.js')

// node methods process
const process = require('process');

// captura de argumentos de terminal
const arguments = process.argv;

//Se invoca la función mdLinks
mdLinks(arguments);
