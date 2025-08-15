const supertest = require('supertest');
const app = require('../index.js');

describe("GET /api/clientes", () => {
    it("Deberia devolver todos los clientes", async () => {
        const res = await supertest(app).get("/api/clientes");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdCliente: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaNac: expect.any(String),
<<<<<<< HEAD:tests/clientes.test.js
                    Telefono: expect.any(Number)
=======
                    Telefono: expect.any(String)
>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
                }),
            ])
        );
    });
});

describe("GET /api/clientes/:id", () => {
  it("Deberia devolver el cliente con el id 1", async () => {
<<<<<<< HEAD:tests/clientes.test.js
    const res = await supertest(app).get("/api/clientes/2");
=======
    const res = await supertest(app).get("/api/clientes/1");
>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCliente: expect.any(Number),
        Nombre: expect.any(String),
        FechaNac: expect.any(String),
<<<<<<< HEAD:tests/clientes.test.js
        Telefono: expect.any(Number)
=======
        Telefono: expect.any(String)
>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
      })
    );
  });
});


<<<<<<< HEAD:tests/clientes.test.js
=======




>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
describe("POST /api/clientes/post", () => {
  it("Deberia devolver el cliente que acabo de crear", async () => {
    const res = await supertest(app).post("/api/clientes/post").send({
      Nombre: "nuevo" ,
      FechaNac : "2003-05-06",
      Telefono : "20213321"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaNac: expect.any(String),
<<<<<<< HEAD:tests/clientes.test.js
        Telefono: expect.any(Number),
=======
        Telefono: expect.any(String),
>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
      })
    );
  });
});


<<<<<<< HEAD:tests/clientes.test.js
describe("PUT /api/clientes/:idCliente", () => {
  it("Deberia devolver el cliente con el id 1 modificado", async () => {
    const res = await supertest(app).put("/api/clientes/2").send({
=======
describe("PUT /api/clientes", () => {
  it("Deberia devolver el cliente con el id 1 modificado", async () => {
    const res = await supertest(app).put("/api/clientes").send({
>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
      IdCliente : 12,
      Nombre: "nuevo" ,
      FechaNac : "2003-05-06",
      Telefono : "20213321"
    });
    expect(res.statusCode).toEqual(200);
  });
});


describe("DELETE /api/clientes/delete/:idCliente", () => {
  it("Deberia devolver el cliente con el id 1 borrado", async () => {
<<<<<<< HEAD:tests/clientes.test.js
    const res = await supertest(app).delete("/api/clientes/delete/3");
=======
    const res = await supertest(app).delete("/api/clientes/delete/1");
>>>>>>> 89978-Costamagna:back/tests/clientes.test.js
    expect(res.statusCode).toEqual(200);

  });
});
