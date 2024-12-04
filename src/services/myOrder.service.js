import jwt from 'jsonwebtoken';  // Importa jwt
import OrdenesService from "./ordenes.service.js";

const orden = new OrdenesService();

class MyOrder {
  constructor() {}

  myOrder = async (req, res, next) => {
    try {
      const token = req.cookies.token;  // Extrae el token de las cookies

      if (!token) {
        return res.status(401).json({ message: 'No estás autenticado' });
      }

      // Decodifica el token para obtener el usuario_id
      let usuario_id;
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);  // Decodifica el token
        usuario_id = decodedToken.id;  // Extrae el id del usuario del token decodificado
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }

      // Llama al método listar usando el id del usuario decodificado
      const orders = await orden.listar(usuario_id);

      res.status(200).json({  // Devuelve la respuesta HTTP aquí
        message: 'Listado de órdenes',
        ordenes: orders
      });
    } catch (error) {
      next(error);  // Maneja el error usando middleware
    }
  }
}

export default MyOrder;
