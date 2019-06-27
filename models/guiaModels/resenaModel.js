const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Resena = sequelize.define('resenas',{
    idusuario:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        validate: {
            notEmpty: true,
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
    puntuacion:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            min: 0,
            max: 10,
        }
    },
    opinion: {
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            len:[0,100],
        },
    },
    fecha:{
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Resena