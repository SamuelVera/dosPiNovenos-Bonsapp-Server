const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const TipoBonsaiTam = sequelize.define('tipoBonsaiTam',{
    idtipo: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    alturaminima: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    alturamaxima:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports= TipoBonsaiTam