// CommonJS Modules para: node method filesystem - path
const fs = require('fs');
const path = require('path');

// funcion para convertir ruta capturada a una ruta absoluta
const converterPath = (pathToConvert) => {
  let pathToConvertResult;
  const pathIsAbsolute = path.isAbsolute(pathToConvert);
  if (pathIsAbsolute) {
    pathToConvertResult = pathToConvert;
  } else {
    pathToConvertResult = path.resolve(pathToConvert).normalize();
  }
  return pathToConvertResult;
};

// funcion RECURSIVA para extraer array de rutas de los archivos .md
const getFilesMd = (arrayPaths, filePathAbsolute) => {
  const isDirResult = fs.statSync(filePathAbsolute).isDirectory(); // booleano
  if (isDirResult) { // es directorio consigue ruta de cada elemento y con ello invoca f recursiva
    const dirFilesResult = fs.readdirSync(filePathAbsolute); // array de contenido directorio
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
const readFileContent = (pathToRead) => new Promise((resolve, reject) => {
  fs.readFile(pathToRead, 'UTF-8', (err, data) => {
    if (err) {
      const errMessage = 'No se puede leer el archivo suministrado';
      reject(errMessage);
    } else {
      resolve(data);
    }
  });
});

// funcion para capturar links de un archivo .md
const getLinks = (pathMd) => new Promise((resolve, reject) => {
  const regxLink = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxText = /\[[\w\s\d.()]+\]/;

  readFileContent(pathMd)
    .then((fileContent) => {
      // revisa el contenido del archivo para capturar links
      const linksArray = fileContent.match(regxLink);

      if (linksArray === null) {
        return [];
      }

      // se transforma array de linksArray para entregar la forma de objeto
      const turnedLinksArray = linksArray.map((myLinks) => {
        const myhref = myLinks.match(regxUrl).join().slice(1, -1); // URL encontradas
        const mytext = myLinks.match(regxText).join().slice(1, -1); // texto que hace ref a URL
        return {
          href: myhref,
          text: mytext,
          fileName: pathMd, // ruta donde se encuentra URL
        };
      });
      resolve(turnedLinksArray);
      return turnedLinksArray;
    })
    .catch((error) => {
      reject(error);
    });
});

const otranueva = (fileResult, mdsArray) => {
  mdsArray.forEach((file) => {
    const otra = getLinks(file)
      .then((linksArrayResult) => {
        const linksObjArray = linksArrayResult;
        return linksObjArray;
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line no-param-reassign
    fileResult = otra;
    // fileResult = JSON.parse(JSON.stringify(otra));
  });
  return fileResult;
};

// funcion para validación de array de rutas
const mdsArraysValidation = (mdsArray) => new Promise((resolve) => {
  let validationResult;
  if (mdsArray.length === 0) {
    validationResult = 'directorio vacio o el archivo no es de extención .md';
    resolve(validationResult);
  } else if (typeof mdsArray !== 'string') { // [.md, .md, .md] array de mds
    let fileResult;
    validationResult = otranueva(fileResult, mdsArray);
    console.log('resultado MAP', validationResult);
    resolve(validationResult);
  } else {
    validationResult = mdsArray;
    resolve(validationResult);
  }
});

module.exports = {
  converterPath,
  pathValidation,
  mdsArraysValidation,
};

// validationResult = mdsArray.flatMap((file) => getLinks(file));
// validationResult = mdsArray.map((file) => {
//   return getLinks(file)
//     .then((linksArrayResult) => {
//       console.log('array links', linksArrayResult);
//       validationResult = linksArrayResult;
//       resolve(validationResult);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   console.log('RES22222222', linksArrayResult);
//   return true;
// });

// validationResult = mdsArray.map((file) => getLinks(file)
//       .then((linksArrayResult) => linksArrayResult).catch((error) => error));

// validationResult = mdsArray.map((file) => getLinks(file)
//       .then((linksArrayResult) => linksArrayResult)
//       .catch((error) => {
//         console.log(error);
//       }));

// // validationResult = [];
// mdsArray.forEach((file) => {
//   const fileResult = getLinks(file)
//     .then((linksArrayResult) => {
//       // validationResult = linksArrayResult;
//       // console.log('resultado MAP', validationResult);
//       // resolve(validationResult);
//       const process = linksArrayResult;
//       return process;
//       // validationResult = linksArrayResult;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   // console.log('resultado MAP', validationResult);
//   // resolve(validationResult);
//   validationResult = fileResult;
//   // console.log('resultado MAP', validationResult);
//   // return validationResult;
//   // return fileResult;
// });

//  // const fileResult = [];
//  let fileResult;
//  mdsArray.forEach((file) => {
//    // const fileResult = getLinks(file)
//    const otra = getLinks(file)
//      .then((linksArrayResult) => {
//        const linksObjArray = linksArrayResult;
//        // console.log('intetnooooooo', linksObjArray);
//        // const linksObjArray = Promise.allSettled(linksArrayResult);
//        // const linksObjArray = Promise.all(linksArrayResult);
//        return linksObjArray;
//      })
//      .catch((error) => {
//        console.log(error);
//      });
//    // validationResult = fileResult;
//    // return validationResult;
//    // fileResult.push(otra);
//    fileResult = otra; // hacer copia de otra a partir de JSON revisar
//    // fileResult = [JSON.parse(JSON.stringify(otra))];
//    return fileResult;
//    // return otra;
//  });
//  validationResult = fileResult;
//  // console.log('resultado MAP', validationResult);
//  resolve(validationResult);
