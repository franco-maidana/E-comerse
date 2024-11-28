import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service.js';  // Ajusta la ruta según la estructura de tu proyecto
const userService = new UserService();  // Crea una instancia de la clase




passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',  
      passwordField: 'password',
    },
    async(email , password , done ) => {
      try {
        const usuario = await userService.buscarPorEmail(email);
        if (!usuario) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, usuario.password)
        if(!isMatch){
          return done(null, false , {message: 'Contraseña incorrecta'})
        }
        return done(null, usuario)

      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport;