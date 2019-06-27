const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const GuiaCategoria = sequelize.define('guiaCategorias',{
    idguia:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },idcategoria:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports= GuiaCategoria