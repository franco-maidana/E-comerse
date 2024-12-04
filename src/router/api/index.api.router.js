import CustomRouter from "../customRouter.js";
import usuariosRouter from "./usuarios.router.js";
import productoRouter from "./productos.router.js";
import ordenesRouter from "./ordenes.router.js";
import sessionsRouter from "./sessions.router.js";
import myOrdenPorId from "./myOrders.js";



const usuarios = new usuariosRouter()
const producto = new productoRouter()
const ordenes = new ordenesRouter()
const idOrden = new myOrdenPorId()

class apiRouter extends CustomRouter{
  init(){
    this.router.use('/usuarios', usuarios.getRouter())
    this.router.use('/productos', producto.getRouter())
    this.router.use('/ordenes', ordenes.getRouter() )
    this.router.use('/sessions', sessionsRouter);
    this.router.use('/orders', idOrden.getRouter()); 
  }
}


export default apiRouter