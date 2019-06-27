const Guia = require('../../guiaModels/guiaModel')
const GuiaCategoria = require('../../guiaModels/guiaCategoriaModel')
const Categoria = require('../../guiaModels/categoriaModel')

GuiaCategoria.belongsTo(Guia, { as: 'guia',
    foreignKey: 'idguia', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

GuiaCategoria.belongsTo(Categoria, { as: 'categoria',
    foreignKey: 'idcategoria', targetKey: 'id',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = GuiaCategoria

