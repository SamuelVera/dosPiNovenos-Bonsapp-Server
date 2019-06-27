const Pais = require('../models/associations/paisAssociations/paisAssociations')

exports.getAllPaises = async (req, res)  => {
    try{
        let response = await Pais.findAll({
            order: [['iso_num', 'ASC']],
        })

        if(!!response){
            let results = response.map(row => row.dataValues)
            res.send({code: 2, data: results})
        }
    }catch(err){
        res.send({code: 1, data: 'Error cargando países, vuelva a cargar la página'})
    }
}