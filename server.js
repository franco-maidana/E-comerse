import express from "express";
import Conexion from "./src/utils/ConexionMySQL.js";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import passport from "./src/middlewares/passport.mid.js";
import session from "express-session";
import cookieParser from 'cookie-parser';



const server = express()

const port = 8080
const ready = () => {
  console.log('server on port : ' + port)
  Conexion
}

server.listen(port, ready)

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(session({
  secret: process.env.SECRET, // Cambia esto por una clave segura
  resave: false, // No guarda la sesión si no hay cambios
  saveUninitialized: false, // No guarda sesiones vacías
}));


server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

const router = new indexRouter()

server.use('/', router.getRouter());
server.use(errorHandler);
server.use(pathHandler);