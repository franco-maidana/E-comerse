import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router()

sessionsRouter.post('/login',
  passport.authenticate('local', {session: false}),
  async(req, res, next) => {
    try {
      return res.status(201).json({
        message: "Usuario logeado",
        usuario: req.user
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default sessionsRouter