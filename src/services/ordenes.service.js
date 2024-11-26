import Conexion from "../utils/ConexionMySQL.js";

class OrdenesService {
  constructor(){
    this.Conexion = Conexion;
  }

  crear = async (req,res,next) => {
    try {
      const {usuario_id , producto_id , cantidad } = req.body

      if(!usuario_id || !producto_id || !cantidad ){
        return res.status(400).json({message: 'Error en la creacion de la orden' })
      }

      const consulta = 'INSERT INTO ordenes (usuario_id , producto_id , cantidad ) VALUES (?,?,?)'
      const values = [usuario_id, producto_id, cantidad];

      const [resultado] = await Conexion.query(consulta, values)

      const queryUser = 'SELECT id, usuario_id, producto_id, cantidad FROM ordenes WHERE id = ?';
      const [orden] = await this.Conexion.query(queryUser, [resultado.insertId]);

      return res.status(201).json({ message: "Orden creada exitosamente", orden: orden[0] });
    } catch (error) {
      return next(error)
    }
  }

  listar = async (req,res,next) => {
    try {
      const consulta = 'SELECT * FROM ordenes'
      const [ordenes] = await Conexion.query(consulta)
      return res.status(201).json({
        message: 'Listado de ordenes',
        ordenes: ordenes
      })
    } catch (error) {
      return next()
    }
  }

  listarId = async (req,res,next) => {
    try {
      const { id } = req.params
      const consulta = 'SELECT * FROM ordenes  WHERE id = ?'
      const [ordenes] = await Conexion.query(consulta, [id])
      if (ordenes.length > 0) { 
        return res.status(200).json({ 
          message: 'Orden encontrado',
          usuario: ordenes[0]  
        });
      } else {
        return res.status(404).json({ 
          message: 'Orden no encontrado en la base de datos'
        });
      }
    } catch (error) {
      return next()
    }
  }

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