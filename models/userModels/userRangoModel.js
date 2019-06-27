const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const UserRango = sequelize.define('usuarioRangos',{
    idusuario:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    idrango: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 0,
        }
    },
    fechaadquirido: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true, 
            isDate: true,
        },
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = UserRango