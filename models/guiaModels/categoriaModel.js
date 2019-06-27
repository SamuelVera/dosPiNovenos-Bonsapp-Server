const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const Categoria = sequelize.define('categorias',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1,30],
        }
    },
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Categoria