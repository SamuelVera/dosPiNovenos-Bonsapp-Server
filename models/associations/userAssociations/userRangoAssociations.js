const User = require('../../userModels/usersModel')
const Rango = require('../../userModels/rangoModel')
const UserRango = require('../../userModels/userRangoModel')

UserRango.belongsTo(User,{
    as: 'usuario', 
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

UserRango.belongsTo(Rango,{
    as: 'rango', 
    foreignKey: 'idrango', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = UserRango