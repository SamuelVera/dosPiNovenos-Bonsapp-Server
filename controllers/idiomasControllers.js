const Idioma = require('../models/associations/guiaAssociations/idiomaAssociations')

exports.getAllIdiomas = async (req, res)  => {
    try{
        let response = await Idioma.findAll()

        if(!!response){
            let results = response.map(row => row.dataValues)
            res.send({code: 2, data: results})
        }
    }catch(err){
        res.send({code: 1, data: err})
    }
}