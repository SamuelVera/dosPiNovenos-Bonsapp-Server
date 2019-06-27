const Rango = require('../../userModels/rangoModel')
const UserRango = require('../../userModels/userRangoModel')

Rango.hasMany(UserRango,{
    as: 'usuarios',
    sourceKey: 'id', foreignKey: 'idrango',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Rango