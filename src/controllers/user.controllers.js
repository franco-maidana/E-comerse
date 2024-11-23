import UserService from "../services/user.services.js";


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
}

export default usuariosControllers
const Controllers = new usuariosControllers()
const  { crear } = Controllers
export { crear };