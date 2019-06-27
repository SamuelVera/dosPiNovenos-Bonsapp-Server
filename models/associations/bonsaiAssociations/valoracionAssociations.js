const User = require('../../userModels/usersModel')
const Bonsai = require('../../bonsaiModel/bonsaiModel')
const ValoracionBonsai =  require('../../bonsaiModel/valoracionBonsaiModel')

ValoracionBonsai.belongsTo(Bonsai, { as: 'bonsai',
    foreignKey: 'idbonsai', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

ValoracionBonsai.belongsTo(User, { as: 'usuario',
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = ValoracionBonsai