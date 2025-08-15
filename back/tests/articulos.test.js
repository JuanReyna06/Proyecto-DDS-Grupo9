const supertest = require('supertest');
const app = require('../index.js');

describe("GET /api/articulos", () => {
    it("Deberia devolver todos los articulos", async () => {
        const res = await supertest(app).get("/api/articulos");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdArticulo: expect.any(Number),
                    Nombre: expect.any(String),
                    Stock: expect.any(Number),
                    FechaAlta: expect.any(String),
                }),
            ])
        );
    });
});

<<<<<<< HEAD:tests/articulos.test.js
describe("GET /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 25", async () => {
    const res = await supertest(app).get("/api/articulos/21");
=======
//recordar buscar un id existente en la base de datos
describe("GET /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 25", async () => {
    const res = await supertest(app).get("/api/articulos/25");
>>>>>>> 89978-Costamagna:back/tests/articulos.test.js
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
      })
    );
  });
});


<<<<<<< HEAD:tests/articulos.test.js
describe("POST /api/articulos/post", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
=======
//recordar que cada test modifica la base de datos
describe("POST /api/articulos/post", () => {
  it("Deberia crear un articulo", async () => {
>>>>>>> 89978-Costamagna:back/tests/articulos.test.js
    const res = await supertest(app).post("/api/articulos/post").send({
      Nombre: "nuevo" ,
      Stock : 20,
      FechaAlta : "2003-05-06"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
      })
    );
  });
});

<<<<<<< HEAD:tests/articulos.test.js

describe("PUT /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await supertest(app).put("/api/articulos/18").send({
=======
//recordar que cada test modifica la base de datos
describe("PUT /api/articulos/:id", () => {
  it("Deberia modificar el articulo con el id nro 25", async () => {
    const res = await supertest(app).put("/api/articulos/25").send({
>>>>>>> 89978-Costamagna:back/tests/articulos.test.js
      IdArticulo : 12,
      Nombre: "nuevo" ,
      Stock : 20,
      FechaAlta : "2003-05-06"
    });
    expect(res.statusCode).toEqual(200);
  });
});

<<<<<<< HEAD:tests/articulos.test.js

describe("DELETE /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 borrado", async () => {
    const res = await supertest(app).delete("/api/articulos/20");
=======
//recordar que cada test modifica la base de datos
describe("DELETE /api/articulos/:id", () => {
  it("Deberia devolver un mensaje que confirme la eliminacion ", async () => {
    const res = await supertest(app).delete("/api/articulos/17");
>>>>>>> 89978-Costamagna:back/tests/articulos.test.js
    expect(res.statusCode).toEqual(200);

  });
});
