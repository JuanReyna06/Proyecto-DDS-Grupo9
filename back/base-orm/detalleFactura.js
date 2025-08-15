const { DataTypes } = require("sequelize");

const DetalleFacturasAttributes = {
    NumeroDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    NumeroFactura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El numero de factura es requerida"
            }
        }
    },
    FechaEmision: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha es requerida"
            }
        }
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La cantidad es requerida"
            }
        }
    },
    NumeroArticulo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El numero articulo es requerido"
            }
        }
    },
    NombreArticulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre articulo es requerido"
            }
        }
    },
}

const DetalleFacturasOptions = {
    timestamps: false
}

const DetalleFacturasModel = {
    DetalleFacturasAttributes,
    DetalleFacturasOptions
}

module.exports = DetalleFacturasModel;
