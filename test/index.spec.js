const mdLinks = require('../src/index');

describe('mdLinks', () => {
  const path = 'test/doc-test';

  it('debe retornar promesa', () => {
    expect(mdLinks(path) instanceof Promise).toBeTruthy();
  });

  it('debe ser un array de objetos', () => mdLinks(path).then((data) => {
    expect(data).toHaveLength(3);
  }));

  const path2 = 'C:\\Users\\Ana Margarita Garcia\\Desktop\\Laboratoria\\BOG004-md-links\\test\\doc-test\\doc2-test\\prueba2-test.md';

  it('debe ser un array de objetos con peticion HTTP', () => mdLinks(path2, { validate: true })
    .then((data) => {
      expect(data[0].value.statusText).toBe('ok');
    }));

  const path3 = '/test/doc-tes';

  it('debe ser un string de ruta no valida', () => mdLinks(path3).then((data) => {
    expect(data).toBe('Ruta no valida');
  }));

  const path4 = 'test/doc-test/otro-test.js';

  it('debe ser un string de dir vacio', () => mdLinks(path4).then((data) => {
    console.log(data);
    expect(data).toBe('Directorio vacio o el archivo no es .md');
  }));
});

// se indica mock de funcion mdLinks
// jest.mock('../src/index');

// describe('mdLinks con MOCK', () => {
//   beforeEach(() => mdLinks.mockClear());

//   const path = 'C:\\Users\\Ana Margarita Garcia\\Desktop\\Laboratoria\\
// BOG004-md-links\\test\\doc-test\\doc2-test\\prueba2-test.md';

//   it('debe retornar promesa', () => {
//     expect(mdLinks(path, { validate: false }) instanceof Promise).toBeTruthy();
//   });

//   it('debe ser un array de objetos', () => mdLinks(path, { validate: false })
//     .then((data) => {
//       expect(data).toHaveLength(1);
//     }));

//   it('debe ser un array de objetos con peticion HTTP', () => mdLinks(path, { validate: true })
//     .then((data) => {
//       expect(data[0].value.status).toBe(200);
//     }));
// });
