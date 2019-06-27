const Categoria = require('../models/associations/guiaAssociations/categoriasAssociations')

exports.getAllCategorias = async (req, res)  => {
    try{
        let response = await Categoria.findAll({
            order: [['id','DESC']]
        })

        if(!!response){
            let results = response.map(row => row.dataValues)
            res.send({code: 2, data: results})
        }
    }catch(err){
        res.send({code: 1, data: err})
    }
}