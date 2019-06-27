const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Rango = sequelize.define('rangos',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Rango