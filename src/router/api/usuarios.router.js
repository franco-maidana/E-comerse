import { Router } from "express";
import Conexion from "../../utils/ConexionMySQL.js"; // Asegúrate de que este archivo exporta correctamente la conexión

const usuariosRouter = Router();

usuariosRouter.get('/prueba', async (req, res, next) => {
  try {
    const [usersMySQL] = await Conexion.query('SELECT * FROM usuarios');  // Agrega await aquí
    res.status(200).json({
      message: 'Usuarios de la base de datos',
      usuarios: usersMySQL  // Ahora usersMySQL es un array
    });
  } catch (error) {
    return next(error);  // Manejo de errores
  }
});

export default usuariosRouter;
