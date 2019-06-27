const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const TipoBonsai = sequelize.define('tipoBonsai',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[1,15],
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = TipoBonsai