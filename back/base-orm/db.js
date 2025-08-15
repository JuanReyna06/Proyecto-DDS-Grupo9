const { Sequelize } = require( "sequelize");

const DetalleFacturasModel = require("./detalleFactura.js");
const { ArticulosAtributos, ArticulosOpciones } = require("./articulo.js");
const FacturaModel = require("./factura.js");
const Cliente = require("./clientes.js");

 const BD = new Sequelize({
    dialect: 'sqlite',
    storage: './Ferreteria.db'
})

BD.define(
  'DetalleFacturas',
  DetalleFacturasModel.DetalleFacturasAttributes, 
  DetalleFacturasModel.DetalleFacturasOptions, 
);
BD.define(
    'Articulos',
    ArticulosAtributos,
    ArticulosOpciones
)

BD.define(
    'Facturas',
    FacturaModel.FacturaAttributes,
    FacturaModel.FacturaOptions
)

BD.define(
    'Clientes',
    Cliente.AtributosClientes,
    Cliente.OptionsClientes
)

const conectar = async () => {
    try {
        // Sincronizar la base de datos con el modelo
        await BD.sync();
    }
    catch (error) {
        console.error("Ha ocurrido un error: ", error);
    }
}

conectar()

module.exports = BD
