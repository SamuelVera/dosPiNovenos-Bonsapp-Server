const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Oferta = sequelize.define('ofertas',{
    idusuario:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
        },
    },
    idbonsai:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
        },
    },
    fechapublicacion:{
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true,
        }
    },
    activa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate:{
            notEmpty: true,
            
        }
    },
    monto: {
        type: Sequelize.INTEGER,
        allowNull: true,
        valite:{
            isNumeric: true,
        },
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Oferta