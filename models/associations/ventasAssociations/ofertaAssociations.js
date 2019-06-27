const User = require('../../userModels/usersModel')
const Bonsai = require('../../bonsaiModel/bonsaiModel')
const Oferta = require('../../ventaModels/ofertaModel')

Oferta.belongsTo(User, { as: 'usuario',
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Oferta.belongsTo(Bonsai, { as: 'bonsai',
    foreignKey: 'idbonsai', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

exports.module = Oferta