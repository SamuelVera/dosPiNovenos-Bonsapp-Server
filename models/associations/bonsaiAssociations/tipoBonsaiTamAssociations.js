const Bonsai = require('../../bonsaiModel/bonsaiModel')
const TipoBonsaiTam = require('../../bonsaiModel/tipoBonsaiTamModel')
const TipoBonsai = require('../../bonsaiModel/tipoBonsaiModel')

TipoBonsaiTam.hasMany(Bonsai,{
    as: 'bonsais',
    sourceKey: 'idtipo', foreignKey: 'idtamano',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

TipoBonsaiTam.belongsTo(TipoBonsai, { as: 'tipo',
    foreignKey: 'idtipo', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = TipoBonsaiTam