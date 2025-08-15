const { DataTypes } = require('sequelize');

const ArticulosAtributos = {
    IdArticulo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FechaAlta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
};

const ArticulosOpciones = {
    timestamps: false
};

const articulo = {
    ArticulosAtributos,
    ArticulosOpciones
};

module.exports = articulo;
