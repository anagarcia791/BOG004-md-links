// CommonJS Modules para: funciones de node-methods.js
const { converterPath, pathValidation, mdsArraysValidation } = require('./node-methods');

/**
 *
 * @param {*} path
 * @param {*} options
 * @returns
 */

// funcion mdLinks
const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  // invoca funcion converterPath
  const absolutePath = converterPath(path);

  // invoca funcion mdsArraysValidation con el resultado de pathValidation CALLBACK
  mdsArraysValidation(options, pathValidation(absolutePath))
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

// se exporta funcion mdLinks
module.exports = mdLinks;
