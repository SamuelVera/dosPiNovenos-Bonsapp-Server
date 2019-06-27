const Sequelize = require('sequelize')
Sequelize.Promise = global.Promise
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/db');
const SALT = process.env;

const User = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    correo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    }
},{
    timestamps: false,
    freezeTableName: true
})

User.prototype.encrypt = function ({ password }) {
    const salt = bcrypt.genSaltSync(parseInt(SALT)) 
    return bcrypt.hashSync(password, salt)
};
  
User.prototype.compare = function(password) {
    const hash = this.password
    return bcrypt.compareSync(password, hash)
};

module.exports = User