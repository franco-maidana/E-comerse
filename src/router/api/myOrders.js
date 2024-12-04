import customRouter from '../../router/customRouter.js'
// myOrdenPorId.js
import { orden } from "../../controllers/myOrden.controllers.js"; // Asegúrate de que 'orden' es una función



class myOrdenPorId extends customRouter {
  init(){
    this.listar('/my-order', ['USUARIO', "ADMIN", "PREM"], orden )
  }
}

export default myOrdenPorId