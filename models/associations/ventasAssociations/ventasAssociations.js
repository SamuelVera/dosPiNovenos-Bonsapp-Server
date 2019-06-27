const User = require('../../userModels/usersModel')
const Bonsai = require('../../bonsaiModel/bonsaiModel')
const Venta = require('../../ventaModels/ventaModel')

Venta.belongsTo(User, { as: 'comprador',
    foreignKey: 'idcomprador', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Venta.belongsTo(User, { as: 'vendedor',
    foreignKey: 'idvendedor', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

Venta.belongsTo(Bonsai, { as: 'bonsai',
    foreignKey: 'idbonsai', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

exports.module = Venta