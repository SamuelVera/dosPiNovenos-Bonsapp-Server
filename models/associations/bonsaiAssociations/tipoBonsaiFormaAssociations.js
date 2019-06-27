const Bonsai = require('../../bonsaiModel/bonsaiModel')
const TipoBonsaiForma = require('../../bonsaiModel/tipoBonsaiFormaModel')
const TipoBonsai = require('../../bonsaiModel/tipoBonsaiModel')

TipoBonsaiForma.hasMany(Bonsai,{
    as: 'bonsais',
    sourceKey: 'idtipo', foreignKey: 'idforma',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

TipoBonsaiForma.belongsTo(TipoBonsai, { as: 'tipo',
    foreignKey: 'idtipo', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = TipoBonsaiForma