const TipoBonsai = require('../models/associations/bonsaiAssociations/tipoBonsaiAssociations')
const TipoBonsaiForma = require('../models/associations/bonsaiAssociations/tipoBonsaiFormaAssociations')

exports.getAllBonsaiTipoForma = async (req, res) => {
    try{

        let response = await TipoBonsai.findAll({
            include:[{
                model: TipoBonsaiForma,
                as: 'formas',
                required: true,
            }],
            order:[['id','ASC']]
        })

        if(!!response){
            let resultado = response.map(element => {
                let id = element.dataValues.id
                let tipo = element.dataValues.tipo
                let descripcion = element.dataValues.formas[0].dataValues.descripcion
                return{
                    id,
                    tipo,
                    descripcion
                }
            })

            res.send({
                status:2,
                data: resultado
            })

        }else{
            res.send({
                status: 1,
                data: 'Error al traer los tipo de bonsai'
            })
        }
    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer los tipo de bonsai'
        })
        throw err
    }
}