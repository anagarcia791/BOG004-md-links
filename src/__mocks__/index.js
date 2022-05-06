const mdLinks = jest.fn((testPath, testOption) => {
  const path = 'C:\\Users\\Ana Margarita Garcia\\Desktop\\Laboratoria\\BOG004-md-links\\test\\doc-test\\doc2-test\\prueba2-test.md';

  const objArrayHttp = [
    {
      status: 'fulfilled',
      value: {
        href: 'https://www.google.com.co/',
        text: 'Google2TEST',
        fileName: 'prueba2-test.md',
        status: 200,
        statusText: 'ok para test nathy',
      },
    },
  ];

  const objArray = [
    {
      href: 'https://www.google.com.co/',
      text: 'Google2TEST',
      fileName: 'prueba2-test.md',
    },
  ];

  return new Promise((resolve) => {
    if (testPath === path && testOption.validate === true) {
      resolve(objArrayHttp);
    } else {
      resolve(objArray);
    }
  });
});

// se exportan MOCK de funcion mdLinks
module.exports = mdLinks;
