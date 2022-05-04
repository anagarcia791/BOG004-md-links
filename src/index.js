// CommonJS Modules para: funciones de node-methods.js
const { converterPath, pathValidation, mdsArraysValidation } = require('./node-methods');

/**
 *
 * @param {*} args;
 * @returns;
 */

// funcion mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {
  // captura de la ruta a partir del array de args
  const catchedPath = args[2];

  // invoca funcion converterPath
  const absolutePath = converterPath(catchedPath);

  // invoca funcion mdsArraysValidation con el resultado de pathValidation CALLBACK
  mdsArraysValidation(args, pathValidation(absolutePath))
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

// se exporta funcion mdLinks
module.exports = mdLinks;
