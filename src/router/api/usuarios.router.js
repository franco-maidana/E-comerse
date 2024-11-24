import { Router } from "express";
import { crear, listar, listarId, modificar, eliminar } from "../../controllers/user.controllers.js";

const usuariosRouter = Router();

usuariosRouter.post('/create', crear);
usuariosRouter.get('/users', listar);
usuariosRouter.get('/users/:id', listarId);
usuariosRouter.patch('/update/:id', modificar);
usuariosRouter.delete('/drop/:id', eliminar);

export default usuariosRouter;
