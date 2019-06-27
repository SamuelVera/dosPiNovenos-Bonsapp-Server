const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Especie = sequelize.define('especies',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombrecomun: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            len: [0,20],
        },
    },
    nombrecientifico: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            len: [0,20],
        },
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Especie