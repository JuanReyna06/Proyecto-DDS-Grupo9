const { DataTypes } = require("sequelize");

const AtributosClientes = {
    IdCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre del cliente es requerido"
            }
        }
    },
    FechaNac: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha de Nacimiento es requerida"
            }
        }
    },
    Telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El telefono del cliente es necesario"
            }
        }
    }
}

const OptionsClientes = {
    timestamps: false
}

const Cliente = {
    AtributosClientes,
    OptionsClientes
}

module.exports = Cliente