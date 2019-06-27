const Bonsai = require('../models/associations/bonsaiAssociations/bonsaiAssociations')
const Especie = require('../models/associations/bonsaiAssociations/especieAssociations')
const TipoBonsaiTam = require('../models/associations/bonsaiAssociations/tipoBonsaiTamAssociations')
const TipoBonsai = require('../models/associations/bonsaiAssociations/tipoBonsaiAssociations')
const TipoBonsaiForma = require('../models/associations/bonsaiAssociations/tipoBonsaiFormaAssociations')
const BonsaiImagen = require('../models/associations/bonsaiAssociations/bonsaiImagenAssociations')
const Sequelize = require('sequelize')
const User = require('../models/associations/userAssociations/userAssociations')
const Valoracion = require('../models/associations/bonsaiAssociations/valoracionAssociations')
const Op = Sequelize.Op

exports.addBonsai = async (req, res) => {
    try{
        const {
            apodo,
            especie,
            tipoforma,
            tamano,
            fechacultivo
        } = req.body.dataBonsai
        const idpropietario = req.body.userId

        let response = await TipoBonsaiTam.findOne({
            attributes:[[Sequelize.col('idtipo'),'id']],
            where:{
                [Op.and]:{
                    alturaminima: {
                        [Op.lte]: tamano
                    },
                    alturamaxima: {
                        [Op.gte]: tamano
                    }
                }
            }
        })
        
        if(!!response){
            let idtamano = response.dataValues.id
            await Bonsai.create({
                apodo,
                idpropietario,
                idespecie: especie,
                idforma: tipoforma,
                idtamano,
                fechacultivo,
                altura: tamano
            })
            res.send({
                status: 2,
                msg: 'Se ha añadido un bonsai exitosamente'
            })
            
        }else{
            res.send({
                status: 1,
                msg: 'Error al añadir bonsai'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al añadir bonsai'
        })
        throw err
    }
}

exports.getBonsaisUser = async (req, res) => {
    try{
        const { iduser } = req.body

        let response = await Bonsai.findAll({
            attributes:[
                [Sequelize.col('id'),'id'],
                [Sequelize.col('apodo'),'apodo'],
                [Sequelize.col('fechacultivo'),'fechacultivo']
            ],
            include:[{
                attributes:[['imagen','imagen']],
                model: BonsaiImagen,
                as:'imagenes',
                order: [['fechasubida','DESC']],
                limit: 1,
                required: true
            }],
            where:{
                idpropietario: iduser
            }
        })
        if(!!response){
            let data = response.map(element => {
                let r = element.dataValues
                let latestpic = null
                if(r.imagenes.length !== 0){
                    latestpic = r.imagenes[0].dataValues.imagen
                }
                return({
                    id: r.id,
                    apodo: r.apodo,
                    fechacultivo: r.fechacultivo,
                    latestpic
                })
            })
            res.send({
                status: 2,
                data
            })
        }else{
            res.send({
                status: 1,
                data: 'Error al traer los bonsais'
            })
        }
    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer los bonsais'
        })
        throw err
    }
}

exports.getReputacionUsuario = async (req, res) => {
    try{
        const { idpropietario } = req.body
        let data = await Valoracion.sum('puntuacion',{
            include:[{
                model: Bonsai,
                as: 'bonsai',
                where:{
                    idpropietario
                }
            }],
            includeIgnoreAttributes: false
        })
        if(!data){
            data = 0
        }
        res.send({
            status: 2,
            data
        })
    }catch(err){
        res.send({
            status: 1,
            data: 'Error a traer la reputación del usuario'
        })
        throw err
    }
}

exports.getOneUserBonsai = async (req, res) => {
    try{
        const {
            iduser,
            idbonsai
        } = req.body

        let response = await Bonsai.findOne({
            include:[{
                attributes:[
                    ['nombre','nombre']
                ],
                model: User,
                as: 'propietario',
                required: true
            },{
                model: TipoBonsaiTam,
                as: 'tipoTam',
                required: true,
                include:[{
                    model: TipoBonsai,
                    as: 'tipo',
                    required: true,
                }]
            },{
                model: TipoBonsaiForma,
                as:'tipoForma',
                required: true,
                include:[{
                    model: TipoBonsai,
                    as: 'tipo',
                    required: true,
                }]
            },{
                model: Especie,
                as: 'especie',
                required: true,
            }],
            where:{
                [Op.and]:{
                    idpropietario: {[Op.eq]: iduser},
                    id: {[Op.eq]: idbonsai}
                }
            }
        })
        
        if(!!response){
            let resultado = response.dataValues
            let tipoTama = resultado.tipoTam.dataValues
            let tipoForma = resultado.tipoForma.dataValues
            let especie = resultado.especie.dataValues
            let data = {
                id: resultado.id,
                nombrePropietario: resultado.propietario.dataValues.nombre,
                apodo: resultado.apodo,
                fechacultivo: resultado.fechacultivo,
                fechaagregado: resultado.fechaagregado,
                iduser,
                tipoTam:{
                    nombre: tipoTama.tipo.dataValues.tipo,
                    alturaminima: tipoTama.alturaminima,
                    alturamaxima: tipoTama.alturamaxima
                },
                tipoForm: {
                    id: tipoForma.tipo.dataValues.id,
                    nombre: tipoForma.tipo.dataValues.tipo,
                    descripcion: tipoForma.descripcion
                },
                especie: {
                    id: especie.id,
                    nombrecomun: especie.nombrecomun,
                    nombrecientifico: especie.nombrecientifico
                },
                altura: resultado.altura
            }
            res.send({
                status: 2,
                data
            })
        }else{
            res.send({
                status: 1,
                data: 'Error al traer el bonsai'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer el bonsai'
        })
        throw err
    }
}

exports.deleteBonsai = async (req, res) => {
    try{
        const { idbonsai, iduser } = req.body
        await Bonsai.destroy({
            where:{
                [Op.and]:{
                    idpropietario: {[Op.eq]: iduser},
                    id: {[Op.eq]: idbonsai}
                }
            }
        })
        res.send({
            msg: 'Eliminado exitosamente (No se puede recuperar)'
        })
    }catch(err){
        res.send({
            msg: 'Error al eliminar'
        })
        throw err
    }
}

exports.getImagesBonsaiPages = async (req, res) => {
    try{
        const { idbonsai } = req.body

        let pages = (await BonsaiImagen.count({
            where:{
                idbonsai
            }
        }))/10

        res.send({
            status: 2,
            pages
        })
    }catch(err){
        res.send({
            status: 1,
            pages: 0
        })
        throw err
    }
}

exports.getImagesBonsai = async (req, res) => {
    try{
        const { idbonsai, page } = req.body

        let response = await BonsaiImagen.findAll({
            attributes:[
                ['imagen','imagen'],
                ['fechasubida','fechasubida']
            ],
            where:{
                idbonsai
            },
            limit: 5,
            offset: 5*page
        })

        if(!!response){

            let data = response.map(element => element.dataValues)

            res.send({
                status: 2,
                data
            })

        }else{
            res.send({
                status: 1,
                data: 'Error al traer las imágenes'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al buscar imágenes'
        })
        throw err
    }
}

exports.addImagenBonsai = async (req, res) => {
    try{
        const { idbonsai, path, fechasubida } = req.body

        await BonsaiImagen.create({
            idbonsai,
            imagen: path,
            fechasubida
        })

        res.send({
            msg: 'Foto subida con éxito'
        })

    }catch(err){
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.send({
                msg: 'Error al subir, esa foto ya existe!'
            })
        }else{
            res.send({
                msg: 'Error al subir foto'
            })
        }
        throw err
    }
}

exports.updateBonsai = async (req, res) => {
    try{
        const {
            id,
            apodo,
            fechacultivo,
            altura,
            idespecie,
            idforma
        } = req.body

        let alturaResponse = await TipoBonsaiTam.findOne({
            include:[{
                model: TipoBonsai,
                as: 'tipo',
                require: true
            }],
            where:{
                [Op.and]:{
                    alturaminima: {
                        [Op.lte]: altura
                    },
                    alturamaxima: {
                        [Op.gte]: altura
                    }
                }
            }
        })

        if(!!alturaResponse){
            let response = await Bonsai.update({
                apodo,
                fechacultivo,
                altura,
                idespecie,
                idforma,
                idtamano: alturaResponse.dataValues.idtipo
            },{
                where:{
                    id
                }
            })
    
            if(!!response){
                console.log(alturaResponse.dataValues.tipo.dataValues.tipo)

                res.send({
                    status: 2,
                    msg: 'Actualización exitosa'
                })
            }else{
                res.send({
                    status: 1,
                    msg: 'Error al actualizar el bonsai'
                })
            }
        }else{
            res.send({
                status: 1,
                msg: 'Error al actualizar el bonsai'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al actualizar el bonsai'
        })
        throw err
    }
}

exports.getBonsaisOtrosUsuarios = async (req, res) => {
    try{
        const { userid, page } = req.body

        let response = await Bonsai.findAll({
            include:[{
                attributes:[['id','id'],['nombre','nombre']],
                as: 'propietario',
                model: User,
                required: true
            },{
                model: Especie,
                as: 'especie',
                required: true
            },{
                model: TipoBonsaiTam,
                as: 'tipoTam',
                required: true,
                include:[{
                    model: TipoBonsai,
                    as: 'tipo',
                    required: true,
                }]
            },{
                model: TipoBonsaiForma,
                as:'tipoForma',
                required: true,
                include:[{
                    model: TipoBonsai,
                    as: 'tipo',
                    required: true,
                }]
            }],
            where:{
                idpropietario:{
                    [Op.not]: userid
                }
            },
            order:[['fechaagregado','DESC']],
            limit: 10,
            offset: page*10
        })

        if(!!response){

            let data = response.map(row => {
                let r = row.dataValues
                return {
                    id: r.id,
                    apodo: r.apodo,
                    fechaCultivo: r.fechacultivo,
                    fechaAgregado: r.fechaagregado,
                    tipoForma: r.tipoForma.dataValues.tipo.dataValues.tipo,
                    especieComun: r.especie.dataValues.nombrecomun,
                    especieCientifico: r.especie.dataValues.nombrecientifico,
                    tipoTamano: r.tipoTam.dataValues.tipo.dataValues.tipo,
                    alturaMinima: r.tipoTam.dataValues.alturaminima,
                    alturaMaxima: r.tipoTam.dataValues.alturamaxima,
                    idPropietario: r.idpropietario,
                    nombrePropietario: r.propietario.dataValues.nombre,
                }
            })

            res.send({
                status: 2,
                data
            })

        }else{
            res.send({
                status: 1,
                data: 'Error al traer los bonsais'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer los bonsais'
        })
        throw err
    }
}

exports.getValoracion = async (req, res) => {
    try{
        const { idbonsai } = req.body

        let response = await Valoracion.findOne({
            attributes:['idbonsai', [Sequelize.fn('AVG',Sequelize.col('puntuacion')),'valoracion']],
            where:{
                idbonsai
            },
            group: 'idbonsai'
        })
        
        let data = 0

        if(!!response){
            data = response.dataValues.valoracion
        }

        res.send({
            status: 2,
            data
        })

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer la valoracion'
        })
        throw err
    }
}

exports.getValoracionDada = async (req, res) => {
    try{
        const { idusuario, idbonsai} = req.body

        let response = await Valoracion.findOne({
            where:{
                idbonsai,
                idusuario
            }
        })

        let data = 0

        if(!!response){
            data = response.dataValues.puntuacion
        }

        res.send({
            status: 2,
            data
        })

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer la valoración'
        })
        throw err
    }
}

exports.addValoracion = async (req, res) => {
    try{
        const { puntuacion, idusuario, idbonsai } = req.body

        await Valoracion.create({
            idusuario,
            idbonsai,
            puntuacion
        })

        res.send({
            data: puntuacion,
            msg: 'Valorado exitosamente' 
        })

    }catch(err){
        res.send({
            data: 0,
            msg: 'Error al enviar valoración'
        })
    }
}

exports.updateValoracion = async (req, res) => {
    try{

        const { puntuacion, idusuario, idbonsai } = req.body

        await Valoracion.update({
            puntuacion
        },{
            where: {
                idusuario,
                idbonsai
            }
        })

        res.send({
            status: 2,
            msg: 'Valoracion actualizada',
            puntuacion
        })

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al actualizar valoracion',
            puntuacion: 0
        })
    }
}

    //Eliminar una imágen
exports.deleteImageBonsai = async (req, res) => {
    try{
        const {
            imagen,
            idbonsai
        } = req.body

        let response = await BonsaiImagen.destroy({
            where:{
                idbonsai,
                imagen
            }
        })

        if(!!response){
            res.send({
                status: 2,
                msg: 'Imagen eliminada exitosamente',
                imagen
            })
        }else{
            res.send({
                status: 1,
                msg: 'Error al eliminar la imagen',
                imagen: null
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al eliminar la imagen',
            imagen: null
        })
        throw err
    }
}