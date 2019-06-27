const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const ValoracionBonsai = sequelize.define('valoracionBonsai',{
    idusuario:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    idbonsai:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    puntuacion:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            min: 0,
            max: 5,
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = ValoracionBonsai