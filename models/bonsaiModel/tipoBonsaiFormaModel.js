const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const TipoBonsaiForma = sequelize.define('tipoBonsaiForma',{
    idtipo: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = TipoBonsaiForma