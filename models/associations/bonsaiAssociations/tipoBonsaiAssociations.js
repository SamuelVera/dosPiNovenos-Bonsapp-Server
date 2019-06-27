const TipoBonsai = require('../../bonsaiModel/tipoBonsaiModel')
const TipoBonsaiTam = require('../../bonsaiModel/tipoBonsaiTamModel')
const TipoBonsaiForma = require('../../bonsaiModel/tipoBonsaiFormaModel')

TipoBonsai.hasMany(TipoBonsaiForma,{
    as: 'formas',
    sourceKey: 'id', foreignKey: 'idtipo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

TipoBonsai.hasMany(TipoBonsaiTam,{
    as: 'tamanos',
    sourceKey: 'id', foreignKey: 'idtipo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = TipoBonsai