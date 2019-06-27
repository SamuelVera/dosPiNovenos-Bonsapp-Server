const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const VisitasGuia = sequelize.define('visitasGuia',{
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
    fechavisita: {
        type: Sequelize.DATE,
        primaryKey: true, 
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

module.exports = VisitasGuia

