const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Comentario = sequelize.define('comentarios',{
    idusuario:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    idguia:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    fechapublicacion: {
        type: Sequelize.DATE,
        primaryKey: true, 
        allowNull: false,
        validate:{
            notEmpty: true,
            isDate: true,
        },
    },
    contenido: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[1,120]
        },
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Comentario