import { Router } from "express";
import usuariosRouter from "./usuarios.router.js";
import productoRouter from "./productos.router.js";
import ordenesRouter from "./ordenes.router.js";

const apiRouter = Router()

apiRouter.use('/usuarios', usuariosRouter);
apiRouter.use('/productos', productoRouter);
apiRouter.use('/ordenes', ordenesRouter);

export default apiRouter