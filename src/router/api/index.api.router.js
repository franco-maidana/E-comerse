import { Router } from "express";
import usuariosRouter from "./usuarios.router.js";
import productoRouter from "./productos.router.js";

const apiRouter = Router()

apiRouter.use('/usuarios', usuariosRouter);
apiRouter.use('/productos', productoRouter);

export default apiRouter