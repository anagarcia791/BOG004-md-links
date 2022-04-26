const {
  converterPath,
  validatePath,
  isDir,
  readDirFiles,
  isFileMd,
} = require('./node-methods.js');

// funcion mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {

  // node methods filesystem - path
  const path = require('path');

  // captura de la ruta a partir del array de args
  const catchedPath = args[2];
  console.log(catchedPath);

  console.log('RUTA ABSOLUTA? ', path.isAbsolute(catchedPath));

  // invoca funcion converterPath
  const absolutePath = converterPath(catchedPath);
  console.log('PATH ', absolutePath);

  // invoca funcion validatePath
  const resultValidatePath  = validatePath(absolutePath);
  console.log('RUTA VALIDA? ', resultValidatePath);

  // se declara array de rutas
  const pathArray = [];

  // condicional de programa si la ruta es valida
  if(resultValidatePath){ // ingresa solo si la ruta es valida
    isDir(absolutePath) // ingresa solo si es directorio
      .then((isDirResult) => {
        if(isDirResult){
          console.log('RECURSIVIDAD REVISAR');
          const dirFiles = readDirFiles(absolutePath);
          resolve(dirFiles);
          // deberia retornar un array con una o mas rutas
        }else{
          console.log('GUARDA RUTA MD EN ARRAY');
          const isFileMdResult =  isFileMd(absolutePath);
          // console.log(isFileMdResult);
          pathArray.push(isFileMdResult);
          console.log(pathArray);
          // resolve(isFileMdResult);
        }
      })
      .catch((error) => {
        console.log('soy error', error);
      });
  }else{
    const invalidPath = 'Ruta no valida';
    console.log(invalidPath);
    return invalidPath;
    // reject(new Error(invalidPath));
  }

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
