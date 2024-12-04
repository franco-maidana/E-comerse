import Conexion from "../utils/ConexionMySQL.js";
import jwt from 'jsonwebtoken'

class OrdenesService {
  constructor(){
    this.Conexion = Conexion;
  }

  crear = async (req, res, next) => {
    try {
      const { producto_id, cantidad } = req.body;
      const token = req.cookies.token;  // Extrae el token de las cookies
  
      if (!token) {
        return res.status(401).json({ message: 'No estás autenticado' });
      }
  
      // Decodifica el token para obtener el usuario_id
      let usuario_id;
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        usuario_id = decodedToken.id;  // Asume que el id del usuario está en el token
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }
  
      // Verifica si los campos requeridos están presentes
      if (!usuario_id || !producto_id || !cantidad) {
        return res.status(400).json({ message: 'Error en la creación de la orden, campos faltantes' });
      }
  
      // Inserta la orden en la base de datos
      const consulta = 'INSERT INTO ordenes (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)';
      const values = [usuario_id, producto_id, cantidad];
  
      const [resultado] = await this.Conexion.query(consulta, values);
  
      // Consulta la orden recién creada
      const queryUser = 'SELECT id, usuario_id, producto_id, cantidad FROM ordenes WHERE id = ?';
      const [orden] = await this.Conexion.query(queryUser, [resultado.insertId]);
  
      return res.status(201).json({ message: 'Orden creada exitosamente', orden: orden[0] });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      return next(error);
    }
  };

  listar = async (userId) => {  
    try {
      const query = `
        SELECT 
          ordenes.id AS orden_id, ordenes.cantidad, ordenes.estado,
          usuarios.id AS usuario_id, usuarios.first_name, usuarios.last_name,
          productos.id AS producto_id, productos.product, productos.marca, productos.modelo, productos.price
        FROM ordenes
        INNER JOIN usuarios ON ordenes.usuario_id = usuarios.id
        INNER JOIN productos ON ordenes.producto_id = productos.id
        WHERE ordenes.usuario_id = ?;  
      `;
      const [ordenes] = await Conexion.query(query, [userId]);
  
      // Calcular el total general después de obtener los datos
      let totalGeneral = 0;
      ordenes.forEach(orden => {
        totalGeneral += orden.price * orden.cantidad;
      });
  
      return {
        ordenes,
        total_a_pagar: totalGeneral  // Agregar el total al resultado
      };
    } catch (error) {
      console.error('Error al listar las ordenes:', error);
      throw error;
    }
  }
  
  listarId = async (req, res, next) => {
    try {
      const { id } = req.params; // ID del usuario
      
      // Consulta detallada con cálculo del precio total por producto y total general
      const consulta = `
        SELECT 
          ordenes.id AS orden_id, ordenes.cantidad, ordenes.estado,
          usuarios.id AS usuario_id, usuarios.first_name, usuarios.last_name,
          productos.id AS producto_id, productos.product, productos.marca, productos.modelo, productos.price,
          (ordenes.cantidad * productos.price) AS total_producto  -- Precio total por producto
        FROM ordenes
        INNER JOIN usuarios ON ordenes.usuario_id = usuarios.id
        INNER JOIN productos ON ordenes.producto_id = productos.id
        WHERE usuarios.id = ?;
      `;
      
      const [ordenes] = await Conexion.query(consulta, [id]);
  
      if (ordenes.length > 0) { 
        // Calcular el precio total de todas las órdenes del usuario
        const precioTotalFinal = ordenes.reduce((total, orden) => total + orden.total_producto, 0);
  
        return res.status(200).json({ 
          message: 'Órdenes encontradas',
          ordenes,  // Detalles completos de las órdenes
          precioTotalFinal // Precio total acumulado de todas las órdenes
        });
      } else {
        return res.status(404).json({ 
          message: 'No se encontraron órdenes para este usuario en la base de datos'
        });
      }
    } catch (error) {
      console.error('Error al buscar las órdenes:', error);
      return next(error);  // Manda el error al middleware de manejo de errores
    }
  };
  
  modificar = async (req, res, next) => {
    try {
      const {id} = req.params
      const { cantidad } = req.body

      let campos = []
      let values = []

      if(cantidad) {campos.push('cantidad = ?'), values.push(cantidad)}

      if(campos.length === 0){
        return res.status(400).json({
          message: 'No se proporcionaron campos para modificar '
        })
      }
      const consulta = `UPDATE ordenes SET ${campos.join(' ')} WHERE id = ?`
      values.push(id)

      const [resultado] = await Conexion.query(consulta, values)

      if(resultado.affectedRows === 0){
        return res.status(404).json({
          message: 'Orden no encontrado o sin cambios '
        })
      }

      return res.status(200).json({
        message: 'Orden actualizado correctamente'
      })

    } catch (error) {
      return next(error)
    }
  }

  elimnar = async (req,res,next) => {
    try {
      const {id} = req.params
      const consulta = 'DELETE FROM ordenes WHERE id = ?'
      const [resultado] = await Conexion.query(consulta, [id])

      if(resultado.affectedRows === 0){
        return res.status(404).json({
          message: 'Orden no encontrado o ya eliminado'
        })
      }
      // respuesta de exito
      return res.status(200).json({
        message: 'Orden eliminado correctamente'
      })

    } catch (error) {
      return next(error)
    }
  }

}

export default OrdenesService