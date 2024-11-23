import { Router } from "express";
import usuariosRouter from "./usuarios.router.js";

const apiRouter = Router()

apiRouter.use('/usuarios', usuariosRouter)


export default apiRouter