const Sequelize = require('sequelize')
const sequelize = require('../../config/db');

const Pais = sequelize.define('pais',{
    iso_num: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
        },
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Pais