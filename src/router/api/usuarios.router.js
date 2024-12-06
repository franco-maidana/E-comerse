import CustomRouter from "../customRouter.js"; // maneja logica de passport y jwt 
import { crear, listar, listarId, modificar, eliminar } from "../../controllers/user.controllers.js";


class usuariosRouter extends CustomRouter {
  init(){
    this.create('/create', ['PUBLIC']  ,crear) // Funciona
    this.listar('/users', ['ADMIN','PREM'] ,listar) // Funciona
    this.listar('/users/:id', ['ADMIN', 'PREM'] , listarId) // funciona
    this.modificar('/update/:id', ['USUARIO', 'ADMIN', 'PREM'] , modificar) // hacer modificaciones para que solo modifique el usuario logeado -- VER
    this.eliminar('/drop/:id', ['ADMIN'], eliminar)  // Funciona
  }
}


export default usuariosRouter;
