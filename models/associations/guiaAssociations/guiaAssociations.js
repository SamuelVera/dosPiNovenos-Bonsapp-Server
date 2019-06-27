const User = require('../../userModels/usersModel')
const Guia = require('../../guiaModels/guiaModel')
const Idioma = require('../../guiaModels/idiomaModel')
const Comentario = require('../../guiaModels/comentarioModel')
const GuiaCategoria = require('../../guiaModels/guiaCategoriaModel')
const Resena = require('../../guiaModels/resenaModel')
const VisitasGuia = require('../../guiaModels/visitasGuiaModel')

Guia.belongsTo(User, { as: 'usuario',
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Guia.belongsTo(Idioma, { as: 'idioma',
    foreignKey: 'ididioma', targetKey: 'isocode',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Guia.hasMany(GuiaCategoria,{
    as: 'categorias',
    sourceKey: 'id', foreignKey: 'idguia',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Guia.hasMany(Resena,{
    as: 'resenas',
    sourceKey: 'id', foreignKey: 'idguia',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Guia.hasMany(Comentario,{
    as: 'comentarios',
    sourceKey: 'id', foreignKey: 'idguia',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Guia.hasMany(VisitasGuia,{
    as: 'visitas',
    sourceKey: 'id', foreignKey: 'idguia',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Guia
