const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const BonsaiImagen = sequelize.define('bonsaiImagen',{
    idbonsai:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    imagen: {
        type: Sequelize.STRING,
        primaryKey: true, 
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    fechasubida: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true,
            isDate: true,
        },
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports= BonsaiImagen