const User = require('../../userModels/usersModel')
const Guia = require('../../guiaModels/guiaModel')
const Resena = require('../../guiaModels/resenaModel')

Resena.belongsTo(User, { as: 'usuario',
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Resena.belongsTo(Guia, { as: 'guia',
    foreignKey: 'idguia', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Resena