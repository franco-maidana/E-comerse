import { Router } from "express";
import { crear } from '../../controllers/producto.controllers.js'

const productoRouter = Router()

productoRouter.post('/create', crear);

export default productoRouter