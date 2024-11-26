import { Router } from "express";
import {crear, listar, listarId, modificar, elimnar} from '../../controllers/ordenes.controllers.js'

const ordenesRouter = Router()

ordenesRouter.post('/create', crear);
ordenesRouter.get('/orders', listar);
ordenesRouter.get('/orders/:id', listarId);
ordenesRouter.patch('/update/:id', modificar);
ordenesRouter.delete('/drop/:id', elimnar);


export default ordenesRouter