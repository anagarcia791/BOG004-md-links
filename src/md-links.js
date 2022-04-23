// funcion mdLinks
const mdLinks = (args) => {

  // node methods filesystem - path
  const fs = require('fs');
  const path = require("path");

  // captura de la ruta a partir del array de args
  const catchedPath = args[2];
  console.log(catchedPath);

  console.log("RUTA ABSOLUTA? ", path.isAbsolute(catchedPath));

  const converterPath = (pathToConvert) => {
    let pathToConvertResult;
    path.isAbsolute(pathToConvert) ? pathToConvertResult = pathToConvert : pathToConvertResult = path.resolve(pathToConvert).normalize();
    return pathToConvertResult;
  }

  // convierte la ruta capturada a una ruta absoluta
  const absolutePath = converterPath(catchedPath);
  console.log("path", absolutePath);

  // verifica si la ruta existe
  const validatePath = (path) => fs.existsSync(path);
  
  // funcion para verificar si es un directorio
  const fileOrDirectory =  (pathToCheck) =>{
    fs.stat(pathToCheck, (err, stats) => {
        if (err) throw err;
        console.log('DIRECTORIO?', stats.isDirectory());
    });
  }

  // funcion para leer contenido de la ruta capturada
  const readFile = (pathToRead) => {
    fs.readFile(pathToRead, 'utf8', function(err, data) {
      if (err) throw err;
      console.log(data);
    });
  }

  // invoca funcion validatePath
  const resultValidatePath  = validatePath(absolutePath);
  console.log("RUTA VALIDA? ", resultValidatePath);

  // condicional de programa si la ruta es valida
  if(resultValidatePath === true ){
    fileOrDirectory(absolutePath)
    readFile(absolutePath);
  }else{
    console.log('FIN PROGRAMA');
  }

}

// se exporta el modulo para usar funcion mdLinks
module.exports = mdLinks;

// obtiene extención del archivo
// const extension = path.extname('./prueba.md');
// console.log(extension);

// obtiene la ruta absoluta del directorio y del archivo actual
// const dirName = path.dirname(__dirname);  
// const fileName = path.dirname(__filename);
// console.log('directory-name :', dirName, 'file-name :', fileName);

