import ProductoService from "../services/producto.service.js";

class productoControllers {
  constructor(){
    this.ProductoService = new ProductoService();
  }

  crear = async (req,res, next) => {
    try {
      await this.ProductoService.crear(req,res,next)
    } catch (error) {
      return next(error)
    }
  }
}


export default productoControllers
const producto = new productoControllers()
const {crear } = producto
export {crear }