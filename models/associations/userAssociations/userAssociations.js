const User = require('../../userModels/usersModel')
const Pais = require('../../paisModel/paisModel')
const UserRango = require('../../userModels/userRangoModel')
const Bonsai = require('../../bonsaiModel/bonsaiModel')
const ValoracionBonsai =  require('../../bonsaiModel/valoracionBonsaiModel')
const Guia = require('../../guiaModels/guiaModel')
const Resena = require('../../guiaModels/resenaModel')
const Comentario = require('../../guiaModels/comentarioModel')
const VisitasGuia = require('../../guiaModels/visitasGuiaModel')
const Venta = require('../../ventaModels/ventaModel')
const Oferta = require('../../ventaModels/ofertaModel')

User.belongsTo(Pais, { as: 'Pais',
    foreignKey: 'idpais', targetKey: 'iso_num',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(UserRango,{
    as: 'usuarios',
    sourceKey: 'id', foreignKey: 'idusuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Bonsai,{
    as: 'bonsais',
    sourceKey: 'id', foreignKey: 'idpropietario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(ValoracionBonsai,{
    as: 'valoraciones',
    sourceKey: 'id', foreignKey: 'idusuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Guia,{
    as: 'guias',
    sourceKey: 'id', foreignKey: 'idUsuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Resena,{
    as: 'resenas',
    sourceKey: 'id', foreignKey: 'idusuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Comentario,{
    as: 'comentarios',
    sourceKey: 'id', foreignKey: 'idusuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(VisitasGuia,{
    as: 'visitas',
    sourceKey: 'id', foreignKey: 'idUsuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Venta,{
    as: 'ventaComprador',
    sourceKey: 'id', foreignKey: 'idcomprador',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Venta,{
    as: 'ventaVendedor',
    sourceKey: 'id', foreignKey: 'idvendedor',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

User.hasMany(Oferta,{
    as: 'ofertas',
    sourceKey: 'id', foreignKey: 'idusuario',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = User