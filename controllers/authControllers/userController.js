const bcrypt = require('bcryptjs')
const User = require('../../models/associations/userAssociations/userAssociations')
const Rango = require('../../models/associations/userAssociations/rangoAssociations')
const UserRango = require('../../models/associations/userAssociations/userRangoAssociations')
const Pais = require('../../models/associations/paisAssociations/paisAssociations')
const Resena = require('../../models/associations/guiaAssociations/resenaAssociations')
const { ROUNDS } = process.env
const sequelize = require('sequelize')
const Op = sequelize.Op

    //Método de registrar un usuario
exports.register = async (req, res, next) => {
    try{
        let { correo, password, nombre, idpais, direccion } = req.body
        const salt = await bcrypt.genSalt(parseInt(ROUNDS))
        const hash = await bcrypt.hash(password, salt)
        let user = await User.findOne({
            where: { correo },
        })

        if(!!user){
            
            res.send({ status: 1, msg: 'ERROR EN EL REGISTRO: Ya existe un usuario con ese correo' } )

        }else{

            await User.create({
                correo,
                password: hash,
                nombre,
                idpais,
                direccion
            })

            res.send({ status: 2, msg: 'REGISTRO EXITOSO: Usuario registrado, acceda a su cuenta' })

        }
    }catch(err){
        throw err;
    }
}

exports.getRango = async (req, res) => {
    try{

        const { idusuario } = req.body
        
        let response = await UserRango.findOne({
            include:[{
                model: Rango,
                as: 'rango',
                require: true
            }],
            where:{
                idusuario
            },
            order:[['idrango','DESC']]
        })

        if(!!response){
            let data = response.dataValues.rango.dataValues
            res.send({
                status: 2,
                data
            })
        }else{
            res.send({
                status: 1,
                data: 'Error al traer el rango del usuario'
            })
        }
    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer el rango del usuario'
        })
        throw err
    }
}

exports.ascenderRango = async (req, res) => {
    
    const { rangoActual, reputacion, idusuario } = req.body

    if(rangoActual === 3){
        res.send({
            status: 3,
            msg: 'Ya tienes el rango más alto!',
            data: null
        })
    }else{
        try{
            if(rangoActual === 2){
                if(reputacion >= 100){
                    await UserRango.create({
                        idusuario,
                        idrango: rangoActual+1,
                        fechaadquirido: new Date()
                    })
                    let response = await Rango.findOne({
                        where:{
                            id: rangoActual + 1
                        }
                    })
                    let data = response.dataValues
                    res.send({
                        status: 2,
                        msg: `Ascenso al rango ${data.nombre} Exitoso`,
                        data
                    })
                }else{
                    res.send({
                        status: 3,
                        msg: `No aplicas para ascender al rango Hachi-Uye te faltan ${100-reputacion} puntos de reputacion`,
                        data: null
                    })
                }
            }else{
                if(reputacion >= 50){
                    await UserRango.create({
                        idusuario,
                        idrango: rangoActual+1,
                        fechaadquirido: new Date()
                    })
                    let response = await Rango.findOne({
                        where:{
                            id: rangoActual + 1
                        }
                    })
                    let data = response.dataValues
                    res.send({
                        status: 2,
                        msg: `Ascenso al rango ${data.nombre} Exitoso`,
                        data
                    })
                }else{
                    res.send({
                        status: 3,
                        msg: `No aplicas para ascender al rango Komono te faltan ${50-reputacion} puntos de reputacion`,
                        data: null
                    })
                }
            }
        }catch(err){
            res.send({
                status: 1,
                msg: 'Error al verificar ascenso',
                data: null
            })
            throw err
        }
    }
}

exports.checkHasResenado = async (req, res) => {
    try{
        const {
            idguia,
            idusuario
        } = req.body //Traer los datos que vienen del front-end

            //Query para buscar la reseña
        let response = await Resena.findOne({
            attributes:[['puntuacion','puntuacion'],['opinion','opinion']],
            where:{
                idguia,
                idusuario
            }
        })

            //Data default enviada al front end
        let title = 'Agregar Resena'
        let status = 3
        let resena = {
            opinion: '',
            puntuacion: 0
        }

        if(!!response){
            title = 'Actualizar Resena'
            status = 2
            resena = {
                opinion: response.dataValues.opinion,
                puntuacion: response.dataValues.puntuacion
            }
        }

        res.send({ //Respuesta enviada al front-end
            status,
            title,
            resena
        })

    }catch(err){
        res.send({
            status: 1,
            title: '',
            resena: null
        })
        throw err
    }
}

//Buscar información de los otros usuarios que no son el conectado
exports.getOtrosUsuarios = async (req, res) => {
    try{
        const {
            idusuarioconectado,
            page
        } = req.body

        let response = await User.findAll({
            attributes:[
                ['id','id'],
                ['correo','correo'],
                ['nombre','nombre'],
                ['direccion','direccion']
            ],
            include:[{
                attributes:[['nombre','nombre']],
                model: Pais,
                as: 'Pais',
                required: true
            }],
            where:{
                id:{
                    [Op.not]: idusuarioconectado
                }
            },
            offset: 10*page,
            limit: 10
        })

        if(!!response){
            let data = response.map(row => {
                let r = row.dataValues
                return {
                    id: r.id,
                    correo: r.correo,
                    nombre: r.nombre,
                    direccion: r.direccion,
                    pais: r.Pais.dataValues.nombre
                }
            })

            let pages = (await User.count({
                where:{
                    id:{
                        [Op.not]: idusuarioconectado
                    }
                }
            }))/10

            res.send({
                status: 2,
                data,
                pages
            })
        }else{
            res.send({
                status: 1,
                data: 'Error al buscar los otros usuarios',
                pages: 0
            })
        }

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al buscar los otros usuarios',
            pages: 0
        })
        throw err
    }
}

exports.getPaisUser = async (req, res) => {
    try{
        const {
            id
        } = req.body

        let response = await User.findOne({
            include:[{
                attributes: [['nombre','nombre']],
                model: Pais,
                as: 'Pais',
                required: true
            }],
            where:{
                id
            }
        })

        if(!!response){
            let data = response.dataValues.Pais.dataValues.nombre
            res.send({
                status: 2,
                data
            })
        }else{
            res.send({
                status: 1,
                data: 'Error al buscar el país'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al buscar el país'
        })
        throw err
    }
}

exports.updateUser = async (req, res) => {
    try{
        const {
            id, 
            user
        } = req.body

        let response = await User.update({
            nombre: user.nombre,
            direccion: user.direccion,
            idpais: user.idpais
        },{
            where:{
                id
            }
        })

        if(!!response){
            res.send({
                status: 2,
                msg: 'Actualizacion exitosa',
                user
            })
        }else{
            res.send({
                status: 1,
                msg: 'Error al actualizar los datos del usuario',
                user: null
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al actualizar los datos del usuario',
            user: null
        })
        throw err
    }
}