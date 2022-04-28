// CommonJS Modules para: node method filesystem - path
const fs = require('fs');
const path = require('path');

// funcion para convertir ruta capturada a una ruta absoluta
const converterPath = (pathToConvert) => {
  let pathToConvertResult;
  const pathIsAbsolute = path.isAbsolute(pathToConvert);
  console.log('RUTA ABSOLUTA ? ', pathIsAbsolute);
  // eslint-disable-next-line no-unused-expressions
  pathIsAbsolute
    ? pathToConvertResult = pathToConvert
    : pathToConvertResult = path.resolve(pathToConvert).normalize();
  return pathToConvertResult;
};

// funcion RECURSIVA para extraer array de rutas de los archivos .md
const getFilesMd = (arrayPaths, filePathAbsolute) => {
  const isDirResult = fs.statSync(filePathAbsolute).isDirectory(); // booleano
  if (isDirResult) { // es directorio consigue ruta de cada elemento y con ello invoca f recursiva
    const dirFilesResult = fs.readdirSync(filePathAbsolute); // array contenido dir
    dirFilesResult.forEach((dirFile) => {
      const dirPathFileAbs = path.join(filePathAbsolute, dirFile);
      getFilesMd(arrayPaths, dirPathFileAbs);
    });
  } else { // es archivo revisa si es .md y lo agrega al array de paths
    const fileExtensionResult = path.extname(filePathAbsolute);
    if (fileExtensionResult === '.md') {
      arrayPaths.push(filePathAbsolute);
    }
  }
  return arrayPaths;
};

// funcion para validación de ruta | valida y luego ejecutar f recursiva | no valida retornar output
const pathValidation = (pathToVerify) => {
  const resultValidatePath = fs.existsSync(pathToVerify);
  console.log('RUTA VALIDA? ', resultValidatePath);

  // se declara variable para capturar array de archivos .md
  const arrayPathsMd = [];
  let getFilesMdResult;

  // condicional de programa para el resultado de validacion de ruta
  if (resultValidatePath) {
    getFilesMdResult = getFilesMd(arrayPathsMd, pathToVerify); // invocando f recursiva
  } else {
    const invalidPath = 'Ruta no valida';
    return invalidPath;
  }

  return getFilesMdResult;
};

// funcion para leer contenido de un archivo
// const readFileContent = (pathToRead) => {
//   fs.promises.readFile(pathToRead, 'UTF-8', (err, data) => {
//     if (err) {
//       const errMessage = 'No se puede leer el archivo suministrado';
//       return errMessage;
//     }
//     // return Promise.all(data);
//     // return data;
//   });
//   return Promise.all(data);
// };

// funcion para leer contenido de un archivo
const readFileContent = (pathToRead) => new Promise((resolve) => {
  fs.readFile(pathToRead, 'UTF-8', (err, data) => {
    if (err) {
      const errMessage = 'No se puede leer el archivo suministrado';
      resolve(errMessage);
    } else {
      resolve(data);
    }
  });
});

const readingFile = (pathMd, regxLink) => readFileContent(pathMd)
  .then((fileContent) => {
    console.log('dataaa :(', fileContent);
    const linksArr = fileContent.match(regxLink);
    return linksArr;
  })
  .catch((error) => {
    console.log(error);
  });

// funcion para capturar links de un archivo .md
const getLinks = (pathMd) => {
  // constantes para expresiones regulares
  const regxLink = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxText = /\[[\w\s\d.()]+\]/;

  // // lectura de cada archivo .md
  // const fileContent = readFileContent(pathMd);
  // // extraccion de links que coinciden con regx se crea array
  // const linksArray = fileContent.match(regxLink);

  // const array = '';
  const linksArray = readingFile(pathMd, regxLink);
  // let linksArray;

  // readFileContent(pathMd)
  //   .then((fileContent) => {
  //     console.log('dataaa :(', fileContent);
  //     linksArray = fileContent.match(regxLink);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  console.log('links despues de async', linksArray);

  // linksArray = [];

  if (linksArray === null) {
    return [];
  }

  // se transforma array de linksArray para entregar la forma de objeto
  const turnedLinksArray = linksArray.map((myLinks) => {
    // constantes para objeto de respuesta
    const myhref = myLinks.match(regxUrl).join().slice(1, -1);// URL encontradas
    const mytext = myLinks.match(regxText).join().slice(1, -1);// texto que hace ref a URL

    return {
      href: myhref,
      text: mytext,
      fileName: pathMd, // ruta donde se encuentra URL
    };
  });

  return turnedLinksArray;
};

// funcion para validación de array de rutas
const mdsArraysValidation = (mdsArray) => {
  let validationResult;
  if (mdsArray.length === 0) {
    validationResult = 'directorio vacio o archivo no tiene extención .md';
  } else if (typeof mdsArray !== 'string') {
    // .flat elimina arr internos, y une todo en unico arr
    validationResult = mdsArray.flatMap((file) => getLinks(file));
  } else {
    validationResult = mdsArray;
  }
  return validationResult;
};

module.exports = {
  converterPath,
  pathValidation,
  mdsArraysValidation,
};
