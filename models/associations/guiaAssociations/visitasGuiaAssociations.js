const User = require('../../userModels/usersModel')
const Guia = require('../../guiaModels/guiaModel')
const VisitasGuia = require('../../guiaModels/visitasGuiaModel')

VisitasGuia.belongsTo(User,{
    as: 'visitante',
    foreignKey: 'idusuario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

VisitasGuia.belongsTo(Guia,{
    as: 'usuario',
    foreignKey: 'idguia', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports= VisitasGuia