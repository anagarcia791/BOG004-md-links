// CommonJS Modules para: chalk
const chalk = require('chalk');

/**
 *
 * @param {*} linksObjArr
 */

// funcion output sin options
const outputWithoutVS = (linksObjArr) => {
  linksObjArr.forEach((link) => {
    console.log(
      chalk.white('href:'),
      chalk.yellowBright(`${link.href}`),
      chalk.white('text:'),
      chalk.blueBright(`${link.text}`),
      chalk.white('fileName:'),
      chalk.cyan(`${link.fileName}`),
    );
  });
};

// funcion output con --validate
const outputWithV = (linksObjArr) => {
  linksObjArr.forEach((link) => {
    if (link.value.status === 200) {
      console.log(
        chalk.white('href:'),
        chalk.yellowBright(`${link.value.href}`),
        chalk.white('text:'),
        chalk.blueBright(`${link.value.text}`),
        chalk.white('fileName:'),
        chalk.cyan(`${link.value.fileName}`),
        chalk.white('status:'),
        chalk.green(`${link.value.status}`),
        chalk.white('statusText:'),
        chalk.green(`${link.value.statusText}`),
      );
    } else {
      console.log(
        chalk.white('href:'),
        chalk.red(`${link.value.href}`),
        chalk.white('text:'),
        chalk.blueBright(`${link.value.text}`),
        chalk.white('fileName:'),
        chalk.cyan(`${link.value.fileName}`),
        chalk.white('status:'),
        chalk.red(`${link.value.status}`),
        chalk.white('statusText:'),
        chalk.red(`${link.value.statusText}`),
      );
    }
  });
};

// funcion output con --stats
const outputWithS = (linksObjArr) => {
  const totalLinks = linksObjArr.length;
  const unique = [...new Set(linksObjArr.map((link) => link.href))];
  const uniqueLinks = unique.length;
  // console.log(
  //   chalk.white('Total:'),
  //   chalk.cyan(totalLinks),
  //   chalk.white('Unique:'),
  //   chalk.green(uniqueLinks),
  // );
  console.table({ totalLinks, uniqueLinks });
};

// funcion output con --validate y --stats
const outputWithVS = (linksObjArr) => {
  outputWithV(linksObjArr);
  const totalLinks = linksObjArr.length;
  const unique = [...new Set(linksObjArr.map((link) => link.value.href))];
  const uniqueLinks = unique.length;
  const broken = linksObjArr.filter((link) => link.value.statusText !== 'ok');
  const brokenLinks = broken.length;
  // console.log(
  //   chalk.white('Total:'),
  //   chalk.cyan(totalLinks),
  //   chalk.white('Unique:'),
  //   chalk.green(uniqueLinks),
  //   chalk.white('Broken:'),
  //   chalk.red(brokenLinks),
  // );
  console.table({ totalLinks, uniqueLinks, brokenLinks });
};

// funcion primer output sin options
const finalOutput = (args, linksObjectArr) => {
  const argsStr = args.length.toString();
  if (typeof linksObjectArr === 'string') {
    console.log(chalk.redBright.bold(linksObjectArr));
  } else if (linksObjectArr.length === 0) {
    console.log(chalk.redBright.bold('Archivo no contiene links'));
  } else if (argsStr === '3') {
    console.log(chalk.magentaBright.bold('✦──✦──LINKS ENCONTRADOS──✦──✦'));
    outputWithoutVS(linksObjectArr);
  } else if (args.includes('--validate') && !args.includes('--stats')) {
    console.log(chalk.magentaBright.bold('✦──✦──VALIDACION DE LINKS ENCONTRADOS──✦──✦'));
    outputWithV(linksObjectArr);
  } else if (!args.includes('--validate') && args.includes('--stats')) {
    console.log(chalk.magentaBright.bold('✦──✦──STATS DE LINKS ENCONTRADOS──✦──✦'));
    outputWithS(linksObjectArr);
  } else if (args.includes('--validate') && args.includes('--stats')) {
    console.log(chalk.magentaBright.bold('✦──✦──VALIDACION Y STATS DE LINKS ENCONTRADOS──✦──✦'));
    outputWithVS(linksObjectArr);
  } else {
    console.log(chalk.redBright.bold('Confirmar argumentos'));
  }
};

// se exporta funcion finalOutput
module.exports = finalOutput;
