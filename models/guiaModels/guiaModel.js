const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Guia = sequelize.define('guias',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        },
    },
    pdfpath: {
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        },
    },
    fechapublicacion:{
        type: Sequelize.DATE,
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

module.exports = Guia