const Bonsai = require('../../bonsaiModel/bonsaiModel')
const Especie = require('../../bonsaiModel/especieModel')

Especie.hasMany(Bonsai, {
    as: 'bonsais',
    sourceKey: 'id', foreignKey: 'idespecie',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Especie