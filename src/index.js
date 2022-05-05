/**
 *
 * @param {*} path
 * @param {*} options
 * @returns
 */

// CommonJS Modules para: funciones de node-methods.js
const { converterPath, pathValidation, mdsArraysValidation } = require('./node-methods');

// funcion mdLinks
const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  // invoca funcion converterPath
  const absolutePath = converterPath(path);

  // variable para crear array de validate true
  const args = [];

  // condicional para revisar si validate es true
  if (options.validate === true) {
    args.push('--validate');
  }

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
