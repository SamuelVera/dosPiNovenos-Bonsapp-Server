const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/associations/userAssociations/userAssociations');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'correo',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
      },
      async function(req, correo, password, done) {
        try{
          let user = await User.findOne({ where: { correo } })
          if (!user)
            return done(null, false, req.flash('loginError', 'No such user found.')); 
          if (!user.compare(password))
            return done(null, false, req.flash('loginError', 'Oops! Wrong password.')); 
          return done(null, user); 
        }catch(err){
          done(err, null)
        }
      }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
})