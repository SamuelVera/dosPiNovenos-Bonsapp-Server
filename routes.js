const { login } = require('./controllers/authControllers/authController');
const { register, getRango, ascenderRango, checkHasResenado, getOtrosUsuarios,
        getPaisUser, updateUser } = require('./controllers/authControllers/userController')
const { getAllPaises } = require('./controllers/paisController')
const { getAllIdiomas } = require('./controllers/idiomasControllers')
const { getAllCategorias } = require('./controllers/categoriasController')
const { getGuias, addGuia, getGuiasFilterIdioma, getGuiasFilterIdiomaCategoria, getGuiasFilterCategoria,
        getOneGuia, getGuiasFromUser, getGuiaEstadisticas, getValoracionPromGuia,
        getComentariosGuia, addComentario, addResena, updateResena, 
        getResenasGuiaPosNeg, getVisitasMesAnterior, deleteGuia, 
        updateGuia, updatePdfGuia, getComentariosPagGuia, getResenasPag } = require('./controllers/guiaController.js')
const { getAllEspecies } = require('./controllers/especiesController')
const { getAllBonsaiTipoForma } = require('./controllers/tipoBonsaiController')
const { addBonsai, getBonsaisUser, getOneUserBonsai, deleteBonsai,
        getImagesBonsai, addImagenBonsai, updateBonsai, getReputacionUsuario,
        getBonsaisOtrosUsuarios, getValoracion, getValoracionDada, addValoracion,
        updateValoracion, deleteImageBonsai, getImagesBonsaiPages } =  require('./controllers/bonsaiController')
const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

router.get('/successLogin', (req, res) => {
    const user = req.user.dataValues
    res.send({ status: 1, user, msg:'¡Bienvenido '+user.nombre+'!'})
})

router.get('/unsuccessLogin', (req, res) => {
    res.send({ status: 2, user: null, msg:'Error en el Login'})
})

router.post('/login', login)

router.post('/register', register)

router.get('/logout', (req, res) => {
    req.logout()
    res.send({msg: 'Desconectado Satisfactoriamente'})
})

router.post('/askLogged', (req, res) => {
    if(req.user !== undefined){
        const user = req.user.dataValues
        res.send({ status: 1, user, msg:'¡Bienvenido '+user.nombre+'!'})
    }else{
        res.send({ status: 2, user: null, msg:'' })
    }
})

//Rutas sobre usuarios
router.post('/fetch-pais-user', getPaisUser)
router.post('/update-user', updateUser)

//Rutas sobre rangos de usuarios
router.post('/fetch-rango', getRango)
router.post('/fetch-reputacion-user', getReputacionUsuario)
router.post('/check-ascender-rango', ascenderRango)
router.post('/is-resenada', checkHasResenado)
router.post('/fetch-otros-usuarios', getOtrosUsuarios)

//Rutas sobre guias
router.post('/add-guia', addGuia)
router.post('/fetch-guias', getGuias)
router.post('/fetch-one-guia', getOneGuia)
router.post('/fetch-guias-categorias', getGuiasFilterCategoria)
router.post('/fetch-guias-idioma-categoria', getGuiasFilterIdiomaCategoria)
router.post('/fetch-guias-idioma', getGuiasFilterIdioma)
router.post('/get-guias-from-user', getGuiasFromUser)
router.post('/fetch-guia-comentarios', getComentariosGuia)
router.post('/fetch-guia-comentarios-pag', getComentariosPagGuia)
router.post('/add-comment', addComentario)
router.post('/update-guia', updateGuia)

//Rutas de data maestra
router.get('/fetch-countries', getAllPaises)
router.get('/fetch-idiomas',  getAllIdiomas)
router.get('/fetch-categorias',  getAllCategorias)

//Rutas de estadisticas de guias
router.post('/fetch-guia-estadisticas', getGuiaEstadisticas)
router.post('/fetch-valoracion-prom-guia', getValoracionPromGuia)
router.post('/add-resena', addResena)
router.post('/update-resena', updateResena)
router.post('/fetch-resenas-posi-o-nega', getResenasGuiaPosNeg)
router.post('/fetch-resenas-pags', getResenasPag)
router.post('/fetch-visitas-mes-anterior', getVisitasMesAnterior)
router.post('/delete-guia', deleteGuia)
router.post('/update-pdf-guia', updatePdfGuia)

//Rutas de bonsais
router.post('/fetch-bonsais-user', getBonsaisUser)
router.get('/fetch-especies', getAllEspecies)
router.get('/fetch-tipo-forma', getAllBonsaiTipoForma)
router.post('/add-bonsai', addBonsai)
router.post('/fetch-one-user-bonsai', getOneUserBonsai)
router.post('/delete-one-bonsai', deleteBonsai)
router.post('/update-bonsai', updateBonsai)
router.post('/fetch-valoracion', getValoracion)
router.post('/fetch-bonsai-otros-users', getBonsaisOtrosUsuarios)
router.post('/fetch-images-bonsai-pag', getImagesBonsaiPages)

//Rutas de imagenes
router.post('/fetch-images-bonsai', getImagesBonsai)
router.post('/add-imagen-bonsai', addImagenBonsai )
router.post('/delete-bonsai-image', deleteImageBonsai)

//Rutas de valoracion de bonsai
router.post('/fetch-valoracion-dada', getValoracionDada)
router.post('/new-valoracion', addValoracion)
router.post('/update-valoracion', updateValoracion)

module.exports = router