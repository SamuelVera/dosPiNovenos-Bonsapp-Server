const Sequelize = require('sequelize')
const sequelize = require('../../config/db');

const Bonsai = sequelize.define('bonsais',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    apodo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [0,20],
        },
    },
    fechacultivo:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate:{
            isDate: true,
        },
    },
    fechaagregado:{
        type: Sequelize.DATEONLY
    },
    altura:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Bonsai