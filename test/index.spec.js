const path = './test/doc-test';
const mdLinks = require('../src/index');

const objArray = [
  {
    href: 'https://www.google.com.co/',
    text: 'Google2TEST',
    fileName: 'prueba2-test.md',
  },
  {
    href: 'https://nodejs.or',
    text: 'NodeTEST',
    fileName: 'prueba-test.md',
  },
  {
    href: 'https://www.google.com.co/',
    text: 'GoogleTEST',
    fileName: 'prueba-test.md',
  },
];

const objArrayHttp = [
  {
    status: 'fulfilled',
    value: {
      href: 'https://www.google.com.co/',
      text: 'Google2TEST',
      fileName: 'prueba2-test.md',
      status: 200,
      statusText: 'ok',
    },
  },
  {
    status: 'fulfilled',
    value: {
      href: 'https://nodejs.or',
      text: 'NodeTEST',
      fileName: 'prueba-test.md',
      status: 404,
      statusText: 'fail',
    },
  },
  {
    status: 'fulfilled',
    value: {
      href: 'https://www.google.com.co/',
      text: 'GoogleTEST',
      fileName: 'prueba-test.md',
      status: 200,
      statusText: 'ok',
    },
  },
];

describe('mdLinks', () => {
  it('debe retornar promesa', () => {
    expect(mdLinks(path) instanceof Promise).toBeTruthy();
  });

  it('debe ser un array de objetos', () => mdLinks(path).then((data) => {
    console.log('data en test', data);
    expect(data).toEqual(objArray);
  }));

  it('debe ser un array de objetos con peticion HTTP', () => mdLinks(path, { validate: true }).then((data) => {
    console.log('data en test HTTP', data);
    expect(data).toEqual(objArrayHttp);
  }));
});
