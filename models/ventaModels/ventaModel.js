const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Venta = sequelize.define('ventas',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subtotal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        valite:{
            isNumeric: true,
        },
    },
    comision: {
        type: Sequelize.INTEGER,
        allowNull: true,
        valite:{
            isNumeric: true,
        },
    },
    fechatransaccion: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true,
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Venta