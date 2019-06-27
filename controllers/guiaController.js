const Guia = require('../models/associations/guiaAssociations/guiaAssociations')
const Resena = require('../models/associations/guiaAssociations/resenaAssociations')
const VisitasGuia = require('../models/associations/guiaAssociations/visitasGuiaAssociations')
const Idioma = require('../models/associations/guiaAssociations/idiomaAssociations')
const Usuario = require('../models/associations/userAssociations/userAssociations')
const GuiaCategoria = require('../models/associations/guiaAssociations/guiaCategoriaAssociations')
const Categoria = require('../models/associations/guiaAssociations/categoriasAssociations')
const Comentario = require('../models/associations/guiaAssociations/comentarioAssociations')
const User = require('../models/associations/userAssociations/userAssociations')
const sequelize = require('sequelize')
const Op = sequelize.Op

exports.getOneGuia = async (req, res) => {
    try{

        const { id, idUsuarioVisitante } = req.body
        let response = await Guia.findOne({
            attributes:{
                exclude: ['idUsuario']
            },
            include:[{
                model: Idioma,
                as: 'idioma',
                required: true,
            },{
                attributes:[
                    ['correo','correo'],
                    ['nombre','nombre']
                ],
                model: Usuario,
                as: 'usuario',
                required: true,
            },{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
            }],
            where:{
                id
            },
        })

        await VisitasGuia.create({
            idusuario: idUsuarioVisitante,
            idguia: id,
            fechavisita: new Date()
        })

        let visitas = await VisitasGuia.count({
            where:{
                idguia: id
            }
        })

        if(!!response){
            let r = response.dataValues
            let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
            res.send({status:2 , data:    
                {
                    id: r.id,
                    nombre: r.nombre.trim(),
                    fechaPublicacion: r.fechapublicacion.toLocaleString(),
                    pdfPath: r.pdfpath,
                    idioma: r.idioma.dataValues.nombre,
                    usuario: {
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo,
                    },
                    categorias,
                    visitas
                }
            })
                
        }else{
            res.send({status: 1, data: 'Error cargando la guía, vuelva a cargar la página'})
        }
    }catch(err){
        res.send({status: 1, data: 'Error cargando la guía, vuelva a cargar la página'})
        throw err
    }
}

exports.getGuiasFilterIdiomaCategoria = async (req, res) => {
    try{
        const { 
            paginas,
            deploy,
            idiomaToFetch,
            categoriasIdToFetch,
            idusuario
        } = req.body

        let response = await Guia.findAll({
            attributes:['id','nombre','fechapublicacion'],
            include:[{
                model: Idioma,
                as: 'idioma',
                where:{
                    isocode: {
                        [Op.like]:idiomaToFetch
                    }
                },
                required: true,
            },{
                attributes:[
                    ['correo','correo'],
                    ['nombre','nombre']
                ],
                model: Usuario,
                as: 'usuario',
                required: true,
            },{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
                where:{
                    idcategoria: {
                        [Op.in]:categoriasIdToFetch
                    }
                },
            }],
            where:{
                idusuario: {
                    [Op.not]: idusuario
                }
            },
            order:[['fechapublicacion','DESC']],
            limit: deploy,
            offset: (paginas*deploy)
        })

        if(!!response){
            let results = response.map(row => {
                let r = row.dataValues
                let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
                return {
                    id: r.id,
                    nombre: r.nombre.trim(),
                    fechaPublicacion: r.fechapublicacion.toLocaleString(),
                    idioma: r.idioma.dataValues.nombre,
                    usuario: {
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo,
                    },
                    categorias
                }
            })
            res.send({status: 2, data: results})
        }else{
            res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
        }
    }catch(err){
        console.log(err)
        res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
    }
}

exports.getGuiasFilterIdioma = async (req, res) => {
    try{
        const { 
            paginas, 
            deploy, 
            idiomaToFetch,
            idusuario
        } = req.body

        let response = await Guia.findAll({
            attributes:['id','nombre','fechapublicacion'],
            include:[{
                model: Idioma,
                as: 'idioma',
                where:{
                    isocode: {
                        [Op.like]:idiomaToFetch
                    }
                },
                required: true,
            },{
                attributes:[
                    ['correo','correo'],
                    ['nombre','nombre']
                ],
                model: Usuario,
                as: 'usuario',
                required: true,
            },{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
            }],
            where:{
                idusuario: {
                    [Op.not]: idusuario
                }
            },
            order:[['fechapublicacion','DESC']],
            limit: deploy,
            offset: (paginas*deploy)
        })

        if(!!response){
            let results = response.map(row => {
                let r = row.dataValues
                let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
                return {
                    id: r.id,
                    nombre: r.nombre.trim(),
                    fechaPublicacion: r.fechapublicacion.toLocaleString(),
                    idioma: r.idioma.dataValues.nombre,
                    usuario: {
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo,
                    },
                    categorias
                }
            })
            res.send({status: 2, data: results})
        }else{
            res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
        }
    }catch(err){
        console.log(err)
        res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
    }
}

exports.getGuiasFilterCategoria = async (req, res) => {
    try{
        const { 
            paginas,
            deploy,
            categoriasIdToFetch,
            idusuario 
        } = req.body

        let response = await Guia.findAll({
            attributes:['id','nombre','fechapublicacion'],
            include:[{
                model: Idioma,
                as: 'idioma',
                required: true,
            },{
                attributes:[
                    ['correo','correo'],
                    ['nombre','nombre']
                ],
                model: Usuario,
                as: 'usuario',
                required: true,
            },{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
                where:{
                    idcategoria: {
                        [Op.in]:categoriasIdToFetch
                    }
                },
            }],
            order:[['fechapublicacion','DESC']],
            where:{
                idusuario: {
                    [Op.not]: idusuario
                }
            },
            limit: deploy,
            offset: (paginas*deploy)
        })

        if(!!response){
            let results = response.map(row => {
                let r = row.dataValues
                let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
                return {
                    id: r.id,
                    nombre: r.nombre.trim(),
                    fechaPublicacion: r.fechapublicacion.toLocaleString(),
                    idioma: r.idioma.dataValues.nombre,
                    usuario: {
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo,
                    },
                    categorias
                }
            })
            res.send({status: 2, data: results})
        }else{
            res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
        }
    }catch(err){
        console.log(err)
        res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
    }
}

    //Get todas las guias
exports.getGuias = async (req, res) => {
    try{
        const { 
            paginas,
            deploy,
            idusuario 
        } = req.body

        let response = await Guia.findAll({
            attributes:['id','nombre','fechapublicacion'],
            include:[
                {
                model: Idioma,
                as: 'idioma',
                required: true,
            },{
                attributes:[
                    ['correo','correo'],
                    ['nombre','nombre']
                ],
                model: Usuario,
                as: 'usuario',
                required: true,
            },{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
            }],
            order:[['fechapublicacion','DESC']],
            where:{
                idusuario: {
                    [Op.not]: idusuario
                }
            },
            limit: deploy,
            offset: (paginas*deploy),
        })

        if(!!response){
            let results = response.map(row => {
                let r = row.dataValues
                let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
                return {
                    id: r.id,
                    nombre: r.nombre.trim(),
                    fechaPublicacion: r.fechapublicacion.toLocaleString(),
                    idioma: r.idioma.dataValues.nombre,
                    usuario: {
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo,
                    },
                    categorias
                }
            })

            res.send({status: 2, data: results})
        }else{
            res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
        }
    }catch(err){
        console.log(err)
        res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
    }
}

exports.addGuia = async (req, res) => {
    try{

        const {
            nombre,
            fechapublicacion,
            idusuario,
            ididioma,
            pdfpath,
            categorias
        } = req.body

        let response = await Guia.create({
            nombre,
            fechapublicacion,
            idusuario,
            ididioma,
            pdfpath
        })

        if(!!response){
            let idguia = response.id

            if(typeof categorias === 'string'){
                await GuiaCategoria.create({
                    idguia, 
                    idcategoria: parseInt(categorias)
                })
            }else{
                categorias.forEach(async (element) => {
                    await GuiaCategoria.create({
                        idguia,
                        idcategoria: element
                    })
                });
            }
            res.send({status: 2, msg:'Se ha guardado su guia con exito'})
        }else{
            res.send({status: 1, msg: 'Error guardando la guía, vuelva a cargar la página'})
        }
    }catch(err){
        console.log(err)
        res.send({status: 1, msg: 'Error agregando guía, verifique la informacion e intentelo nuevamente'})
    }
}

exports.getGuiasFromUser = async (req, res) => {
    try{
        const {
            idusuario 
        } = req.body

        let response = await Guia.findAll({
            attributes:['id','nombre','fechapublicacion'],
            include:[
                {
                model: Idioma,
                as: 'idioma',
                required: true,
            },{
                attributes:[
                    ['correo','correo'],
                    ['nombre','nombre']
                ],
                model: Usuario,
                as: 'usuario',
                required: true,
            },{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
            }],
            order:[['fechapublicacion','DESC']],
            where:{
                idusuario
            }
        })

        if(!!response){
            let data = response.map(row => {
                let r = row.dataValues
                let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
                return {
                    id: r.id,
                    nombre: r.nombre.trim(),
                    fechaPublicacion: r.fechapublicacion.toLocaleString(),
                    idioma: r.idioma.dataValues.nombre,
                    usuario: {
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo,
                    },
                    categorias
                }
            })
            res.send({
                status: 2,
                data
            })
        }else{
            res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
        }
    }catch(err){
        console.log(err)
        res.send({status: 1, data: 'Error cargando guías, vuelva a cargar la página'})
    }
}

exports.getGuiaEstadisticas = async (req, res) => {
    try{
        const {
            id,
            idusuario
        } = req.body

        let response = await Guia.findOne({ //declara variable response. Await = operacion E/S. findOne
            attributes:{
                exclude: ['idUsuario']
            },
            include:[{
                model: Idioma, // model = nombre tabla 
                as: 'idioma', //el alias que está en models associations
                required: true, //inner join. False:left outer
            }
            ,{
                model: GuiaCategoria,
                as:'categorias',
                required: true,
                include:[{
                    model: Categoria,
                    as: 'categoria',
                }],
            }],
            where:{   //Donde las ids coincidan con las que le estoy pasando
                id,
                idusuario
            },
        })

        let visitas = await VisitasGuia.count({
            where:{
                idguia: id
            }
        })

        if(!!response){  //Doble negación para comprobar que existe y no tome el truly o falsely
            //Response tiene metadata de la respuesta, además de esto los datos reales
            let r = response.dataValues  //Declara variable r con los datos de la respuesta.
            //Para sacar data de un include se debe usar dataValues cada vez que se baja un nivel en el objeto
            /*
                al hacer console.log(r)
                se ve esto:

                r {
                    id: 10,...
                    categorias:[{
                        ....
                        dataValues:{
                            categoria:{
                                dataValues:{
                                    id: 1,
                                    nombre: 'Podado'
                                }
                            }
                        }
                        ....
                    }...]
                    .....
                }
            */
            let categorias = r.categorias.map(row => row.dataValues.categoria.dataValues)
            res.send({status:2 , 
                data:{
                    id: r.id,
                    //Trim():
                    //         Guia 1        => Guia 1
                    //Guia 1           => Guia 1
                    nombre: r.nombre.trim(),
                    //toLocaleString transforma la fecha en forma
                    //de String en formato fecha
                    fechaPublicacion: r.fechapublicacion.toLocaleString(), 
                    pdfPath: r.pdfpath,
                    idioma: r.idioma.dataValues,
                    categorias,
                    visitas
                }
            })
        }else{
            res.send({status: 1, data: 'Error cargando la guía, vuelva a cargar la página'})
        }
    }catch(err){
        res.send({status: 1, data: 'Error cargando la guía, vuelva a cargar la página'})
        throw err
    }
}

exports.getValoracionPromGuia = async (req, res) => {
    try{
        
        const { idguia } = req.body

        let response = await Resena.findOne({
            attributes:[
                [sequelize.fn('AVG',sequelize.col('puntuacion')),'promedio']
            ],
            where:{
                idguia
            },
            group: 'idguia'
        })

        let data = 0

        if(!!response){
            data = response.dataValues.promedio
        }

        res.send({
            status: 2,
            data
        })

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer la valoración promedio de la guía'
        })
        throw err
    }
}

exports.getVisitasMesAnterior = async (req, res) => {
    try{
        const {
            idguia
        } = req.body

        let dateInicial = new Date()
        let dateFinal = new Date()

        dateInicial.setMonth(dateInicial.getMonth()-1)
        dateInicial.setDate(1)
        dateFinal.setDate(0)

        let results = await VisitasGuia.findOne({
            attributes:[[sequelize.fn('COUNT',sequelize.col('*')),'cantidadVisitas']],
            where: {
                fechavisita:{
                    [Op.between]: [dateInicial,dateFinal]
                },
                idguia
            }
        })

        let data = 0

        if(!!results){
            data = results.dataValues.cantidadVisitas
        }

        res.send({
            status: 2,
            data
        })

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer las visitas del mes anterior'
        })
        throw err
    }
}

//Get comentario de las guías
exports.getComentariosGuia = async (req, res) => {
    try{
        const {
            idguia,
            page
        } = req.body //Data pasada desde el frontend

        let response = await Comentario.findAll({ //Buscar en la tabla comentario
            include:[{ //INNER JOIN con usuario
                attributes:[
                    ['nombre','nombre'],
                    ['correo','correo']
                ], //Del usuario traer solo el username y el correo, para ocultar su password
                model: User, //Model del usuario
                as: 'usuario', //Alias de la asociación,
                required: true //INNER JOIN
            }],
            where:{ //donde la guía sea la envía por el front end
                idguia
            },
            order: [['fechapublicacion','DESC']], //Ordenar por la fecha de publicación desde la más actual
            offset: 10*page, //Mover el cursor de los comentarios que se traen
            limit: 10 //Solo traer 10 a partir de la posición del cursor
        })

        //Inicializado, si no hay comentarios se mantiene vacio
        let data = []

        if(!!response){ //Check del valor truly y falsey, además de si hay comentarios
            data = response.map(row => {
                let r = row.dataValues
                return{
                    usuario:{
                        id: r.idusuario,
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo
                    },
                    fechapublicacion: r.fechapublicacion,
                    contenido: r.contenido.trim()
                }
            })
        }

        res.send({
            status: 2,
            data
        })

    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer los comentarios'
        })
        throw err
    }
}

exports.getComentariosPagGuia = async (req, res) => {
    try{
        const {
            idguia
        } = req.body

        let pages = (await Comentario.count({
            where:{
                idguia
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

//Agregar un comentario a una guia
exports.addComentario = async (req, res) => {
    try{
        const {
            idguia,
            idusuario,
            contenido,
            fechapublicacion
        } = req.body //Data enviada desde el fron-end

        await Comentario.create({//INSERT INTO comentario
            idguia,//Estos campos
            idusuario,//coinciden
            contenido,//con los del modelo
            fechapublicacion
        })

        res.send({
            status: 2, //Exito
            msg: 'Se agregó exitosamente'
        })

    }catch(err){
        res.send({
            status: 1, //Fallo
            msg: 'Error al agregar comentario'
        })
    }
}

//Agregar una reseña a una guia
exports.addResena = async (req, res) => {
    try{
        const {
            idguia,
            idusuario,
            puntuacion,
            opinion,
            fecha
        } = req.body //Data enviada desde el front-end

        await Resena.create({ //INSERT INTO resenas Lo que le estoy enviando desde el front-end
            idguia, //Estos campos
            idusuario, //coinciden con
            puntuacion, //Los del 
            opinion, //Modelo
            fecha
        })

        res.send({
            status: 2, //Exito
            msg: 'Resena exitosa'
        })
    }catch(err){ //Manejo del error
        res.send({
            status: 1,
            msg: 'Error al agregar la resena'
        })
        throw err
    }
}

//Actualizar una reseña
exports.updateResena = async (req, res) => {
    try{
        const {
            idguia,
            idusuario,
            puntuacion,
            opinion,
            fecha
        } = req.body //Data enviada desde el front-end

        await Resena.update({ //UPDATE resenas Lo que le estoy enviando desde el front-end
            idguia, //Estos campos
            idusuario, //coinciden con
            puntuacion, //Los del 
            opinion, //Modelo
            fecha
        },{
            where:{//WHERE idguia y idusuario sea lo que pasé
                idguia,
                idusuario
            }
        })

        res.send({
            status: 2, //Exito
            msg: 'Actualizacion exitosa'
        })
    }catch(err){ //Manejo del error
        res.send({
            status: 1,
            msg: 'Error al actualizar la resena'
        })
        throw err
    }
}

//Get reseñas según el criterio positivo o negativo
exports.getResenasGuiaPosNeg = async (req, res) => {
    try{
        const {
            page,
            idguia,
            criterio,
            qtty
        } = req.body //Data envíada desde el front-end

        let operacion = '' //Para decidir el orden
        let operacion2 = '' //Para decidir el menor o mayor qué

        if(criterio === 0){
            operacion = 'ASC'
            operacion2 = Op.lte
        }else{
            operacion = 'DESC'
            operacion2 = Op.gte
        }

        let response = await Resena.findAll({ //SELECT * FROM resenas
            include:[{ //INNER JOIN
                //Solo traer el correo y el nombre para ocultar su password
                attributes: [['nombre','nombre'],['correo','correo']], 
                model: User, //usuarios
                as: 'usuario', //Alias de la asociación (models/associations)
                required: true //INNER JOINT
            }],
            where:{
                idguia, //Donde el id de guia coincida con el enviado desde el front-end
                puntuacion: {
                    [operacion2]: 5
                }
            },
            order: [
                ['puntuacion',`${operacion}`], //Ordenar primero por la puntuacion dependiendo de la operación
                ['fecha','DESC'] //Luego ordenar por la fecha que se hizo la reseña
            ],
            offset: 15*page, //Mover el cursor
            limit: qtty, //Traer 15 luego de la posición del cursor
        })

        let data = [] //Si no hay reseñas se retornar el arreglo de data vacío

        if(!!response){
            data = response.map(row => {
                let r  = row.dataValues
                return {
                    usuario:{
                        nombre: r.usuario.dataValues.nombre,
                        correo: r.usuario.dataValues.correo
                    },
                    puntuacion: r.puntuacion,
                    opinion: r.opinion,
                    fechapublicacion: r.fecha
                }
            })
        }

        let pages = (await Resena.count({
            where:{
                idguia
            }
        }))/qtty

        res.send({
            status: 2,
            data,
            pages
        })
    }catch(err){
        res.send({
            status: 1,
            data: 'Error al traer las resenas'
        })
    }
}

exports.getResenasPag = async (req, res) => {
    try {
        const {
            idguia,
            qtty
        } = req.body

        let pages = (await Resena.count({
            where:{
                idguia
            }
        }))/qtty

        res.send({
            status: 2,
            pages
        })
        
    }catch(err) {
        res.send({
            status: 1,
            pages: 0
        })
        throw err
    }
}

//Eliminar una guía
exports.deleteGuia = async (req, res) => {
    try{
        const {
            idusuario,
            id
        } = req.body //Lo que s envía desde el cliente

        let path = await Guia.findOne({
            attributes:[['pdfpath','pdfpath']],
            where:{
                idusuario,
                id
            }
        })

        let response = await Guia.destroy({
            where:{
                idusuario,
                id
            }
        })

        if(!!response){
            res.send({
                status: 2,
                msg: 'La guia se elimino exitosamente',
                reference: path.dataValues.pdfpath
            })
        }else{
            res.send({
                status: 1,
                msg: 'Error al eliminar la guía',
                reference: null
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al eliminar la guía',
            reference: null
        })
        throw err
    }
}

//Actualizar una guía
exports.updateGuia = async (req, res) => {
    try{
        const {
            id,
            idusuario,
            guia
        } = req.body

        let response = await Guia.update({
            nombre: guia.nombre,
            ididioma: guia.ididioma
        },{
            where:{
                id,
                idusuario
            }
        })

        if(!!response){
            res.send({
                status: 2,
                msg: 'Acualizacion exitosa'
            })
        }else{
            res.send({
                status: 1,
                msg: 'Error al actualizar la guia'
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al actualizar la guia'
        })
        throw err
    }
}

exports.updatePdfGuia = async (req, res) => {
    try{
        const {
            id, 
            idusuario,
            pdfpath
        } = req.body

        let response = await Guia.update({
            pdfpath
        },{
            where: {
                id,
                idusuario
            }
        })

        if(!!response){
            res.send({
                status: 2,
                msg: 'Actualizacion del pdf exitosa',
                pdfPath: pdfpath
            })
        }else{
            res.send({
                status: 1,
                msg: 'Error al acutalizar el pdf',
                pdfPath: ''
            })
        }

    }catch(err){
        res.send({
            status: 1,
            msg: 'Error al acutalizar el pdf',
            pdfPath: ''
        })
    }
}