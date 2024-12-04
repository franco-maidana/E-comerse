import { Router } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
const usuarios = new UserService();

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      if (typeof each !== "function") {
        throw new Error("Uno de los controladores no es una función");
      }
      try {
        await each.apply(this, params);
      } catch (error) {
        params[1].status(500).json({ message: error.message });
      }
    });
  }
  

  politicas = (arraypoliticas) => async (req, res, next) => {
    try {
      if (arraypoliticas.includes("PUBLIC")) return next();
      let token = req.cookies.token
      if (!token)
        return res
          .status(401)
          .json({ message: "No estas Autenticado - Custom-router " });
      else {
        const data = jwt.verify(token, process.env.SECRET_TOKEN);
        if (!data)
          return res
            .status(400)
            .json({ message: "Bad Auth by token Custom-router " });
        else {
          const { email, role } = data;
          if (
            (role === "USUARIO" && arraypoliticas.includes("USUARIO")) ||
            (role === "ADMIN" && arraypoliticas.includes("ADMIN")) ||
            (role === "PREM" && arraypoliticas.includes("PREM"))
          ) {
            const user = await usuarios.buscarPorEmail(email);
            req.user = user;
            return next();
          } else {
            return res
              .status(403)
              .json({ message: " No tienes acceso a esta ruta - Custom-router " });
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  };

  create(path, politicas, ...cbs) {
    this.router.post(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  listar(path, politicas, ...cbs) {
    this.router.get(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  modificar(path, politicas, ...cbs) {
    this.router.patch(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  eliminar(path, politicas, ...cbs) {
    this.router.delete(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  use(path, politicas, ...cbs) {
    this.router.use(path, this.politicas(politicas), this.applyCbs(cbs));
  }
}
