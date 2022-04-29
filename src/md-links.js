// CommonJS Modules para: funciones de node-methods.js
const { converterPath, pathValidation, mdsArraysValidation } = require('./node-methods');

// funcion mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {
  // resolve, reject
  // ['C:\Program Files\nodejs','C:\Users\BOG004-md-links\index.js','./folder-test','--p1','--p2']

  // captura de la ruta a partir del array de args
  const catchedPath = args[2];

  // invoca funcion converterPath
  const absolutePath = converterPath(catchedPath);

  // invoca funcion mdsArraysValidation con el resultado de pathValidation CALLBACK
  // const pathValidations = mdsArraysValidation(pathValidation(absolutePath));
  // console.log('resultado en md', pathValidations);

  mdsArraysValidation(pathValidation(absolutePath))
    .then((result) => {
      console.log('resultado en md', result);
      resolve(result);
      // Promise.all(result)
      //   .then((result2) => {
      //     console.log('resultttt', result2);
      //     resolve(result2);
      //   })
      //   .catch((error) => {
      //     console.log('errorr', error);
      //   });
    })
    .catch((error) => {
      reject(error);
    });
});

// se exporta el modulo para usar funcion mdLinks
module.exports = mdLinks;
