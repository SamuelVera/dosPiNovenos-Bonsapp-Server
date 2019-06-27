const Bonsai = require('../../bonsaiModel/bonsaiModel')
const BonsaiImagen = require('../../bonsaiModel/bonsaiImagenModel')

BonsaiImagen.belongsTo(Bonsai, { as: 'bonsai',
    foreignKey: 'idbonsai', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = BonsaiImagen