import express from "express";
import Conexion from "./src/utils/ConexionMySQL.js";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const server = express()

const port = 8080
const ready = () => {
  console.log('server on port : ' + port)
  Conexion
}

server.listen(port, ready)

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use('/', indexRouter);
server.use(errorHandler);
server.use(pathHandler);