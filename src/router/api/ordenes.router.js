import CustomRouter from '../customRouter.js';
import {crear, listar, listarId, modificar, elimnar, listarOrdenes} from '../../controllers/ordenes.controllers.js'

class ordenesRouter extends CustomRouter {
  init(){
    this.create('/create', ['USUARIO',"ADMIN", "PREM"] , crear) // funciona
    this.listar('/orders', [,"ADMIN", "PREM"] ,listarOrdenes)  // funciona
    this.listar('/orders/:id', ["ADMIN", "PREM"] ,listarId)  // funciona
    this.modificar('/update/:id', ['ADMIN',"ADMIN", "PREM"] ,modificar) // funciona
    this.eliminar('/drop/:id', ['USUARIO', "ADMIN", "PREM"] ,elimnar) // funciona
  }
}

export default ordenesRouter