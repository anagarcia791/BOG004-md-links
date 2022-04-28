// CommonJS Modules para: funciones de node-methods.js
const { converterPath, pathValidation, mdsArraysValidation } = require('./node-methods');

// funcion mdLinks
const mdLinks = (args) => new Promise(() => {
  // resolve, reject

  // ['C:\Program Files\nodejs','C:\Users\BOG004-md-links\index.js','./folder-test','--p1','--p2']

  // captura de la ruta a partir del array de args
  const catchedPath = args[2];

  // invoca funcion converterPath
  const absolutePath = converterPath(catchedPath);

  // invoca funcion mdsArraysValidation con el resultado de pathValidation CALLBACK
  const pathValidations = mdsArraysValidation(pathValidation(absolutePath));
  console.log('resultado en md', pathValidations);
});

// se exporta el modulo para usar funcion mdLinks
module.exports = mdLinks;

// const test = new Promise((resolve, reject) => {
//   return "hola";
// });
// test.then(response => {
//   console.log(response);
// })

// obtiene la ruta absoluta del directorio y del archivo actual
// const dirName = path.dirname(__dirname);
// const fileName = path.dirname(__filename);
// console.log('directory-name :', dirName, 'file-name :', fileName);
