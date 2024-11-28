import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service.js';  // Ajusta la ruta según la estructura de tu proyecto
const userService = new UserService();  // Crea una instancia de la clase




passport.use('login', new LocalStrategy(
  {passReqToCallback: true , usernameField: 'email'},
  async(req, email, password, done) => {
    try {
      const usuario = await userService.buscarPorEmail(email)
      
      if(usuario){
        const verify = bcrypt.compareSync(password, usuario.password)
        if(verify){
          delete usuario.password
          return done(null, usuario)
        }else{
          return done(null, false)
        }
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error)
    }
  }
))

export default passport;