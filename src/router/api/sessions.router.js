import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import jwt from "jsonwebtoken";

const sessionsRouter = Router();

sessionsRouter.post('/login',
  passport.authenticate('login', { session: false, failureRedirect: '/api/sessions/badauth' }),
  async (req, res, next) => {
    try {
      const users = req.user;
      const payload = {
        id: users.id,
        role: users.role
      };

      const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '1d', // Token expira en 1 día
      });

      // Configurar la cookie con el token
      res.cookie('token', token, {
        httpOnly: true,     // Asegura que la cookie no sea accesible desde JavaScript del cliente
        secure: process.env.NODE_ENV === 'production', // Solo en producción
        maxAge: 24 * 60 * 60 * 1000  // Expira en 1 día
      });

      return res.status(200).json({
        message: "Usuario logueado",
        users,
        token: token
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default sessionsRouter;
