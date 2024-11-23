import { Router } from "express";
import { crear } from "../../controllers/user.controllers.js";

const usuariosRouter = Router();

usuariosRouter.post('/create', crear)

export default usuariosRouter;
