import OrdenesService from "../services/ordenes.service.js";

class OrdenesControllers {
  constructor(){
    this.OrdenesControllers = new OrdenesService()
  }

  crear = async (req,res,next) => {
    try {
      await this.OrdenesControllers.crear(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  listar = async (req,res,next) => {
    try {
      await this.OrdenesControllers.listar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  listarOrdenes = async (req,res,next) => {
    try {
      await this.OrdenesControllers.listarOrdenes(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  listarId = async (req,res,next) => {
    try {
      await this.OrdenesControllers.listarId(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  modificar = async (req,res,next) => {
    try {
      await this.OrdenesControllers.modificar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  elimnar = async (req,res,next) => {
    try {
      await this.OrdenesControllers.elimnar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }
}

export default OrdenesControllers
const ordenes = new OrdenesControllers()
const {crear, listar, listarId, modificar, elimnar, listarOrdenes} = ordenes
export {crear, listar, listarId ,modificar, elimnar, listarOrdenes}