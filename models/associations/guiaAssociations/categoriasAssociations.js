const GuiaCategoria = require('../../guiaModels/guiaCategoriaModel')
const Categoria = require('../../guiaModels/categoriaModel')

Categoria.hasMany(GuiaCategoria,{
    as: 'guias',
    sourceKey: 'id', foreignKey: 'idcategoria',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = Categoria