/**
 *
 * @param {*} pathToConvert
 * @returns
 */

// CommonJS Modules para: node methods filesystem - path | axios
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// funcion para convertir ruta capturada a una ruta absoluta
const converterPath = (pathToConvert) => {
  let pathToConvertResult;
  const pathIsAbsolute = path.isAbsolute(pathToConvert); // ruta absoluta? booleano
  if (pathIsAbsolute) {
    pathToConvertResult = pathToConvert;
  }
  pathToConvertResult = path.resolve(pathToConvert).normalize();
  return pathToConvertResult;
};

// funcion RECURSIVA para extraer array de rutas de los archivos .md
const getFilesMd = (arrayPaths, filePathAbsolute) => {
  const isDirResult = fs.statSync(filePathAbsolute).isDirectory(); // es directorio? booleano
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

// funcion para validación de ruta | valida: ejecuta f recursiva | no valida: retorna output
const pathValidation = (pathToVerify) => {
  const resultValidatePath = fs.existsSync(pathToVerify); // ruta valida ? booleano

  // se declara variable para capturar array de archivos .md
  let getFilesMdResult;

  if (resultValidatePath) { // si ruta valida invoca f recursiva
    getFilesMdResult = getFilesMd([], pathToVerify);
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
      const linksArray = fileContent.match(regxLink); // revisa content archivo para capturar links

      if (linksArray === null) { // si no hay links en archivo retorna []
        resolve([]);
      }

      const turnedLinksArray = linksArray.map((myLinks) => { // transforma arr links y entrega objt
        const myhref = myLinks.match(regxUrl).join().slice(1, -1); // URL encontradas
        const mytext = myLinks.match(regxText).join().slice(1, -1); // texto que hace ref a URL
        return {
          href: myhref,
          text: mytext.substring(0, 50),
          fileName: path.basename(pathMd), // ruta de URL
        };
      });
      resolve(turnedLinksArray);
    })
    .catch((error) => {
      reject(error);
    });
});

// funcion para crear array de objetos con links
const allLinksObjArr = (mdsArray) => new Promise((resolve, reject) => {
  const linksObjArr = [];
  mdsArray.map((file) => getLinks(file)
    .then((linksArrayResult) => {
      linksObjArr.push(linksArrayResult); // [[{l1},{l2}...],[{l1}...],[{l1}...]] arr con arr de obj
      if (linksObjArr.length === mdsArray.length) {
        resolve(linksObjArr.flat());
      }
    })
    .catch((error) => {
      reject(error);
    }));
});

// funcion para peticion HTTP
const httpPetition = (linksObjArr) => {
  const axiosPromises = linksObjArr.map((link) => { // transforma arr de objt con peticion axios
    const axiosPetition = axios.get(link.href) // hace peticion axios de cada href
      .then((axiosResult) => {
        const successObject = Object.assign(link, { status: axiosResult.status, statusText: 'ok' });
        return successObject; // retorna nuevo obj con la informacion inicial y status - statusText
      })
      .catch(() => {
        const failObject = Object.assign(link, { status: 404, statusText: 'fail' });
        return failObject; // retorna nuevo obj con la informacion inicial y status - statusText
      });
    return axiosPetition; // retorna nuevo objt con respuesta de successObject o failObject
  });
  return Promise.allSettled(axiosPromises); // retorna nuevo objt segun respuesta de cada link
};

// funcion para validación de array de rutas
const mdsArraysValidation = (option, mdsArray) => new Promise((resolve, reject) => {
  let validationResult;
  if (mdsArray.length === 0) {
    validationResult = 'Directorio vacio o el archivo no es .md';
    resolve(validationResult);
  } else if (typeof mdsArray !== 'string') { // [.md, .md, .md] array de mds
    allLinksObjArr(mdsArray)
      .then((linksObj) => {
        if (option.validate === true) {
          httpPetition(linksObj) // invoca funcion de peticion http
            .then((httpLinksObj) => {
              resolve(httpLinksObj);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(linksObj); // resuelve objeto solamente con: fileName - href - text
        }
      })
      .catch((error) => {
        reject(error);
      });
  } else {
    validationResult = mdsArray;
    resolve(validationResult);
  }
});

// se exportan funciones para mdLinks
module.exports = {
  converterPath,
  pathValidation,
  mdsArraysValidation,
};
