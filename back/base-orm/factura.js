const { DataTypes } = require("sequelize");

const FacturaAttributes={
    IdFactura:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    FechaEmision:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha de emision es necesaria"
            }
        }
    }, 
    Cliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El cliente es necesario"
            }
        }

    },
    Tipo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El tipo es necesario"
            }
        }
    },
    Detalle:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El detalle es necesaio"
            }
        }
    },

}

const FacturaOptions = {
    timestamps: false
}

 const FacturaModel ={
    FacturaAttributes,
    FacturaOptions
}

module.exports = FacturaModel;