const express = require('express');
const detallesFacturas = require('./routers/detalleFactura.router.js');
const articulos = require('./routers/articulos.js');
const facturas = require('./routers/facturas-router.js');
const clientes = require ('./routers/clientes.js')
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

app.get("/", (req, res) => {
    res.send("Main");
});
app.use(express.json());

app.use(detallesFacturas);
app.use(articulos);
app.use(facturas)
app.use(clientes)

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto", port);
});

module.exports = app;