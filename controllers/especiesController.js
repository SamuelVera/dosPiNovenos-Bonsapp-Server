const Especie = require('../models/associations/bonsaiAssociations/especieAssociations')

exports.getAllEspecies = async (req, res) => {
    try{
        let respuesta = await Especie.findAll({
            order:[['id','DESC']]
        })
        if(!!respuesta){
            let resultado = respuesta.map(element => element.dataValues)
            res.send({
                status: 2,
                data: resultado
            })
        }else{
            res.send({
                status: 1,
                data: 'Error al traer las especies'
            })
        }
    }catch(err){
        res.send({
            status: 1,
            data: 'Error al trar las especies'
        })
        throw err
    }
}