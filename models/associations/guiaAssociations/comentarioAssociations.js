const User = require('../../userModels/usersModel')
const Guia = require('../../guiaModels/guiaModel')
const Comentario = require('../../guiaModels/comentarioModel')

Comentario.belongsTo(Guia, {
    as: 'guia',
    foreignKey: 'idguia', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Comentario.belongsTo(User, {
    as: 'usuario',
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Comentario