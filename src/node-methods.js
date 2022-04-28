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

// funcion para verificar si la ruta existe
const validatePath = (pathToValidate) => fs.existsSync(pathToValidate);

// funcion para verificar si es un directorio
const isDir = (pathToCheck) => {
  const isDirResult = fs.statSync(pathToCheck).isDirectory();
  return isDirResult;
};

// funcion para revisar documentos del directorio
const dirFiles = (pathToCheck) => {
  const arrayDirFiles = fs.readdirSync(pathToCheck);
  return arrayDirFiles;
};

// funcion para revisar extencion de archivo
const fileExtension = (filePath) => {
  const extension = path.extname(filePath);
  return extension;
};

// funcion RECURSIVA para extraer array de rutas de los archivos .md
const getFilesMd = (arrayPaths, filePathAbsolute) => {
  const isDirResult = isDir(filePathAbsolute);
  if (isDirResult) { // es directorio consigue ruta de cada elemento y con ello invoca f recursiva
    const dirFilesResult = dirFiles(filePathAbsolute);
    dirFilesResult.forEach((dirFile) => {
      const dirPathFileAbs = path.join(filePathAbsolute, dirFile);
      getFilesMd(arrayPaths, dirPathFileAbs);
    });
  } else { // es archivo revisa si es .md y lo agrega al array de paths
    const fileExtensionResult = fileExtension(filePathAbsolute);
    if (fileExtensionResult === '.md') {
      arrayPaths.push(filePathAbsolute);
    }
  }
  return arrayPaths;
};

// funcion para validación de ruta valida para ejecuta funcion recursiva | no valida retornar output
const pathValidation = (pathToVerify) => {
  // invoca funcion validatePath
  const resultValidatePath = validatePath(pathToVerify);
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
const readFileContent = (pathToRead) => {
  const content = fs.readFileSync(pathToRead, 'utf-8');
  return content;
};

// funcion para capturar links de un archivo .md
const getLinks = (pathMd) => {
  // constantes para expresiones regulares
  const regxLink = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxText = /\[[\w\s\d.()]+\]/;

  // lectura de cada archivo .md
  const fileContent = readFileContent(pathMd);

  // extraccion de links que coinciden con regx se crea array
  const linksArray = fileContent.match(regxLink);

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
    const allLinksArray = mdsArray.map((file) => getLinks(file));
    validationResult = allLinksArray.flat(); // .flat elimina array internos,junta todo en unico arr
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
