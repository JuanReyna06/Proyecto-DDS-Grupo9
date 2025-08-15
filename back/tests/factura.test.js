const request = require("supertest");
const app = require("../index.js")

const FacturaAlta = {
  FechaEmision: '03/25/2020',
  Cliente: 8,
  Tipo: 'Tipo A',
  Detalle: 14
}




describe("GET /api/facturas/", () => {
    it("Debería devolver todas las facturas", async () => {
      const res = await request(app).get("/api/facturas");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdFactura: expect.any(Number),
            FechaEmision: expect.any(String),
            Cliente: expect.any(Number),
            Tipo: expect.any(String),
            Detalle: expect.any(Number),
          }),
        ])
      );
    });
  });
  
  describe("GET /api/facturas/:idFactura", () => {
    it("Debería devolver la factura con el id 3", async () => {
      const res = await request(app).get("/api/facturas/7");
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toEqual(
        expect.objectContaining({
          IdFactura: expect.any(Number),
          FechaEmision: expect.any(String),
          Cliente: expect.any(Number),
          Tipo: expect.any(String),
          Detalle: expect.any(Number),
        })
      );
    });
  });
  
  describe("POST /api/facturas", () => {
    it("Debería devolver la factura que acabo de crear", async () => {
      const res = await request(app).post("/api/facturas").send(FacturaAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          FechaEmision: expect.any(String),
          Cliente: expect.any(Number),
          Tipo: expect.any(String),
          Detalle: expect.any(Number),
        })
      );
    });
  });
  
  describe("PUT /api/facturas/:idFactura", () => {
    it("Debería devolver la factura con el id 20 modificada", async () => {
      const res = await request(app).put("/api/facturas/11").send({
        IdFactura: 21,
        FechaEmision: '03/25/2020',
        Cliente: 9,
        Tipo: 'Nuevo tipo',
        Detalle: 14
      });
      expect(res.statusCode).toEqual(200);
    });
  });
  
  describe("DELETE /api/facturas/:idFactura", () => {
    it("Debería devolver la factura con el id 5 borrada", async () => {
      const res = await request(app).delete("/api/facturas/12");
      expect(res.statusCode).toEqual(200);
    });
  });

