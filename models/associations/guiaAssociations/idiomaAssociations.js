const Guia = require('../../guiaModels/guiaModel')
const Idioma = require('../../guiaModels/idiomaModel')

Idioma.hasMany(Guia,{
    as: 'guias',
    sourceKey: 'isocode', foreignKey: 'ididioma',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Idioma