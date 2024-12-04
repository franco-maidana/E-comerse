import { Strategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import UserService from '../services/user.service.js'
const userService = new UserService();


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_TOKEN
}

passport.use(new Strategy(options, async (payload, done) => {
  try {
    const user = await userService.listarIdPassport(payload.id); // Asegúrate de usar payload.id
    if (user) {
      return done(null, user); // Autenticación exitosa
    } else {
      return done(null, false); // Usuario no encontrado
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return done(error, false); // Error en la autenticación
  }
}));



export default passport