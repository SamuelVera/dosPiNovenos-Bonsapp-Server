const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Idioma = sequelize.define('idiomas',{
    isocode: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate:{
            isAlpha: true,
            notEmpty: true,
        },
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Idioma