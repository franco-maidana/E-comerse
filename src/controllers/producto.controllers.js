import ProductoService from "../services/producto.service.js";

class productoControllers {
  constructor(){
    this.ProductoService = new ProductoService();
  }

  crear = async (req,res,next) => {
    try {
      await this.ProductoService.crear(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  listar = async (req,res,next) => {
    try {
      await this.ProductoService.listado(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  listarId = async(req,res,next)=> {
    try {
      await this.ProductoService.listadoId(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  modificar = async (req,res,next) => {
    try {
      await this.ProductoService.modificar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  eliminar = async (req,res,next) => {
    try {
      await this.ProductoService.eliminar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }
}


export default productoControllers
const producto = new productoControllers()
const { crear, listar, listarId, modificar , eliminar } = producto
export { crear, listar, listarId, modificar, eliminar }