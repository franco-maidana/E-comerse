import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router()

sessionsRouter.post('/login',
  passport.authenticate('login', {session: false , failureRedirect: '/api/sessions/badauth' }),
  async(req, res, next) => {
    try {
      return res.status(200).json({
        message: "Usuario logeado",
        usuario: req.user
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get('/badauth', (req,res,next) => {
  try {
    return res.status(401).json({message: 'Bad Auth'})
  } catch (error) {
    return next(error)
  }
})

export default sessionsRouter