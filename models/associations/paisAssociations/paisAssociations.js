const Pais = require('../../paisModel/paisModel')
const User = require('../../userModels/usersModel')

Pais.hasMany(User, {
    as: 'usuarios',
    sourceKey: 'iso_num', foreignKey: 'idpais',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Pais