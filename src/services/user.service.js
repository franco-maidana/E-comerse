import Conexion from "../utils/ConexionMySQL.js";
import bcrypt from 'bcrypt';

class UserService {
  constructor() {
    this.Conexion = Conexion;
  }

  crear = async (req, res, next) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      // Validación de datos 
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          message: 'Faltan datos por ingresar'
        });
      }
      // validacion de email
      if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
        return res.status(400).json({
          message: 'Email incorrecto, por favor ingrese un email de tipo Gmail o Hotmail'
        });
      }
      // Hasheo de la contraseña con un salt
      const salt = await bcrypt.genSalt(10);  // Se genera un salt
      const hashedPassword = await bcrypt.hash(password, salt); // Se hashea la contraseña
      // Inserción en la base de datos
      const query = 'INSERT INTO usuarios (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      const values = [first_name, last_name, email, hashedPassword];

      const [CreateUser] = await this.Conexion.query(query, values);

      const queryUser = 'SELECT id, first_name, last_name, email FROM usuarios WHERE id = ?';
      const [user] = await this.Conexion.query(queryUser, [CreateUser.insertId]);
      // Respuesta de éxito
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        userId: user[0]
      });
    } catch (error) {
      // Manejo de errores
      return next(error);
    }
  }

  listar = async (req, res , next) => {
    try {
      const consulta = 'SELECT * FROM usuarios'
      const [users] = await Conexion.query(consulta)
      return res.status(201).json({
        message: 'Listadod de usuarios',
        usurios: users
      })
    } catch (error) {
      return next(error)
    }
  }

  listarId = async (req, res , next) => {
    try {
      const { id } = req.params
      const consulta = 'SELECT * FROM usuarios WHERE id = ?'
      const [users] = await Conexion.query(consulta , [id])
      // si encontramos el usuario // si no lo encontramos       
      if (users.length > 0) { 
        return res.status(200).json({ 
          message: 'Usuario encontrado',
          usuario: users[0]  
        });
      } else {
        return res.status(404).json({ 
          message: 'Usuario no encontrado en la base de datos'
        });
      }
    } catch (error) {
      return next(error)
    }
  }

  modificar = async (req, res, next) => {
    try {
      const {id} = req.params;
      const {first_name, last_name, email, password} = req.body

      let campos = [];
      let valores = [];

      if (first_name) {campos.push('first_name = ? '), valores.push(first_name)};
      if (last_name) {campos.push('last_name = ? '), valores.push(last_name)};
      if (email) {campos.push('email = ? '), valores.push(email)};
      if (password) {campos.push('password = ? '), valores.push(password)};

      if (campos.length === 0){
        return res.status(400).json({
          message: 'No se proporcionaron campos para modificar '
        })
      }
      // ejecutamos la consulta 
      const consulta = `UPDATE usuarios SET ${campos.join(' ')} WHERE id = ?`
      valores.push(id)

      const [resultado] = await Conexion.query(consulta, valores)

      if(resultado.affectedRows === 0){
        return res.status(404).json({
          message: 'Usuario no encontrado o sin cambios '
        })
      }
      // respuesta exito
      return res.status(200).json({
        message: 'Usuario actualizado correctamente'
      })
    } catch (error) {
      return next(error)
    }
  }

  eliminar = async (req, res, next) => {
    try {
      const {id} = req.params
      const consulta = 'DELETE FROM usuarios WHERE id = ?'
      const [resultado] = await Conexion.query(consulta, [id])

      if(resultado.affectedRows === 0){
        return res.status(404).json({
          message: 'Usuario no encontrado o ya eliminado'
        })
      }
      // respuesta de exito
      return res.status(200).json({
        message: 'Usuario eliminado correctamente'
      })
    } catch (error) {
      return next(error)
    }
  }

}


export default UserService;