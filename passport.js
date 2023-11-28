const passport = require('passport');
const passportJWT = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Necesitarás instalar el módulo 'passport-google-oauth20'
const User = require("../usuario/user");
const jwt = require('jsonwebtoken');
const llave = require("./llave");

// Configuración de la estrategia de autenticación con Google
passport.use(new GoogleStrategy({
    clientID: 'TU_CLIENT_ID', // Reemplaza con tu ID de cliente de Google
    clientSecret: 'TU_CLIENT_SECRET', // Reemplaza con tu secreto de cliente de Google
    callbackURL: 'http://localhost:3000/auth/google/callback', // Reemplaza con tu URL de retorno
  },
  (accessToken, refreshToken, profile, done) => {
    // Aquí puedes personalizar cómo manejas la información del usuario después de la autenticación exitosa
    // Por ejemplo, puedes buscar o crear un usuario en tu base de datos
    User.findOne({ googleId: profile.id }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        // Si el usuario no existe, crea uno nuevo
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          // Otros campos que quieras guardar en tu base de datos
        });

        user.save((err) => {
          if (err) return done(err);
          return done(null, user);
        });
      } else {
        // Si el usuario ya existe, simplemente devuelve el usuario existente
        return done(null, user);
      }
    });
  }
));

// Configuración de la estrategia de autorización con JWT
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = llave;

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  let user = User.findById(jwt_payload.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

// Función para generar un token JWT
function generateToken(user) {
  const token = jwt.sign({ id: user._id }, llave, { expiresIn: '1h' });
  return token;
}

module.exports = {
  passport,
  generateToken,
};
