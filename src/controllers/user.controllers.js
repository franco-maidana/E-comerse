import UserService from "../services/user.service.js";


class usuariosControllers {
  constructor(){
    this.UserService = new UserService();
  }

  crear = async(req, res, next) => {
    try {
      await this.UserService.crear(req, res, next);
    } catch (error) {
      return next(error)
    }
  }

  listar = async(req, res, next) => {
    try {
      await this.UserService.listar(req,res,next);
    } catch (error) {
      return next(error)
    }
  }

  listarId =  async(req, res, next) => {
    try {
      await this.UserService.listarId(req,res,next);
    } catch (error) {
      return next(error)
    }
  }

  modificar = async(req,res,next) => {
    try {
      await this.UserService.modificar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }

  eliminar = async(req,res,next) => {
    try {
      await this.UserService.eliminar(req,res,next)
    } catch (error) {
      return next(error)
    }
  }
}

export default usuariosControllers
const Controllers = new usuariosControllers()
const  { crear, listar, listarId, modificar, eliminar } = Controllers
export { crear, listar, listarId, modificar, eliminar };