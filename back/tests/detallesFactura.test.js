const request = require("supertest");
const app = require("../index.js");

const detalleFacturaAlta = {
    NumeroFactura: 333,
    FechaEmision: "2025-12-12",
    Cantidad: 10,
    NumeroArticulo: 17,
    NombreArticulo: "Lamparita"
}

describe("GET /api/detalleFacturas/", () => {
    it("Deberia devolver todos los detalles de facturas", async () => {
      const res = await request(app).get("/api/detalleFacturas");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            NumeroDetalle: expect.any(Number),
            NumeroFactura: expect.any(Number),
            FechaEmision: expect.any(String),
            Cantidad: expect.any(Number),
            NumeroArticulo: expect.any(Number),
            NombreArticulo: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("GET /api/detalleFacturas/:numeroDetalle", () => {
    it("Deberia devolver el detalle de factura con el id", async () => {
      const res = await request(app).get("/api/detalleFacturas/15");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          NumeroDetalle: expect.any(Number),
          NumeroFactura: expect.any(Number),
          FechaEmision: expect.any(String),
          Cantidad: expect.any(Number),
          NumeroArticulo: expect.any(Number),
          NombreArticulo: expect.any(String),
        })
      );
    });
  });

  describe("POST /api/detalleFacturas", () => {
    it("Deberia devolver el detalle de factura que acabo de crear", async () => {
      const res = await request(app).post("/api/detalleFacturas/").send(detalleFacturaAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            NumeroFactura: expect.any(Number),
            FechaEmision: expect.any(String),
            Cantidad: expect.any(Number),
            NumeroArticulo: expect.any(Number),
            NombreArticulo: expect.any(String)
        })
      );
    });
  });
  
  describe("PUT /api/detalleFacturas/:numeroDetalle", () => {
    it("Deberia devolver el articulo con el id 11 modificado", async () => {
      const res = await request(app).put("/api/detalleFacturas/11").send({
        NumeroFactura : 201,
        FechaEmision: "2003-05-06",
        Cantidad: 20,
        NumeroArticulo: 12,
        NombreArticulo: "nuevo"
      });
      expect(res.statusCode).toEqual(200);
    });
  });
  
  describe("DELETE /api/detalleFacturas/:numeroDetalle", () => {
    it("Deberia devolver el articulo con el id 11 borrado", async () => {
      const res = await request(app).delete("/api/detalleFacturas/13");
      expect(res.statusCode).toEqual(200);
  
    });
  });  
  
  