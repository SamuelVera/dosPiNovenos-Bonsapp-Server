const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.send({ status: 2, user: null, msg:'Error en el Login' })
        }
        if (!user) {
            return res.send({ status: 2, user: null, msg:'Error de autenticación, verifica tú usuario y contraseña' })
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.send({ status: 2, user: null, msg:'Error en el Login' })
            }
            const user = req.user.dataValues
            res.send({ status: 1, user, msg:'¡Bienvenido '+user.nombre+'!'})
        });
        })(req, res, next);}