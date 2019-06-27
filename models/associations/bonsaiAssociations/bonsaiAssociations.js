const User = require('../../userModels/usersModel')
const Bonsai = require('../../bonsaiModel/bonsaiModel')
const BonsaiImagen = require('../../bonsaiModel/bonsaiImagenModel')
const TipoBonsaiTam = require('../../bonsaiModel/tipoBonsaiTamModel')
const TipoBonsaiForma = require('../../bonsaiModel/tipoBonsaiFormaModel')
const ValoracionBonsai =  require('../../bonsaiModel/valoracionBonsaiModel')
const Especie = require('../../bonsaiModel/especieModel')
const Venta = require('../../ventaModels/ventaModel')
const Oferta = require('../../ventaModels/ofertaModel')

Bonsai.belongsTo(User, { as: 'propietario',
    foreignKey: 'idpropietario', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.belongsTo(TipoBonsaiForma, { as: 'tipoForma',
    foreignKey: 'idforma', targetKey: 'idtipo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.belongsTo(TipoBonsaiTam, { as: 'tipoTam',
    foreignKey: 'idtamano', targetKey: 'idtipo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.belongsTo(Especie, { as: 'especie',
    foreignKey: 'idespecie', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.hasMany(ValoracionBonsai,{
    as: 'valoraciones',
    sourceKey: 'id', foreignKey: 'idbonsai',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.hasMany(BonsaiImagen,{
    as: 'imagenes',
    sourceKey: 'id', foreignKey: 'idbonsai',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.hasMany(Venta,{
    as: 'ventas',
    sourceKey: 'id', foreignKey: 'idbonsai',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Bonsai.hasMany(Oferta,{
    as: 'ofertas',
    sourceKey: 'id', foreignKey: 'idbonsai',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports= Bonsai