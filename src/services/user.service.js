import Conexion from "../utils/ConexionMySQL.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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

  async listarUsuariosPassport() {
    try {
      const consulta = 'SELECT id, first_name, last_name, email FROM usuarios';
      const [users] = await this.Conexion.query(consulta);
      return users;  // Devuelve la lista de usuarios
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;  // Maneja el error
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

  async listarIdPassport(id) {
    try {
      const consulta = 'SELECT * FROM usuarios WHERE id = ?';
      const [users] = await Conexion.query(consulta, [id]);
      
      if (users.length > 0) {
        return users[0]; // Devuelve el usuario encontrado
      } else {
        return null; // Devuelve null si no se encuentra el usuario
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      throw error; // Maneja el error en Passport
    }
  }
  

  modificar = async (req, res, next) => {
    try {
      // Verifica si el token está en las cookies
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'No autenticado' });
      }
      // Decodifica el token (usa tu clave secreta)
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN); // SECRET_TOKEN debe estar en tus variables de entorno
      const userId = decoded.id; // Asegúrate de que el payload del token incluya el `id` del usuario

      const { first_name, last_name, email, password } = req.body;
  
      let campos = [];
      let valores = [];
  
      if (first_name) { campos.push('first_name = ?'); valores.push(first_name); }
      if (last_name) { campos.push('last_name = ?'); valores.push(last_name); }
      if (email) { campos.push('email = ?'); valores.push(email); }
      if (password) { campos.push('password = ?'); valores.push(password); }
  
      if (campos.length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron campos para modificar' });
      }
      // Ejecuta la consulta usando el `userId` del token
      const consulta = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`;
      valores.push(userId);
  
      const [resultado] = await Conexion.query(consulta, valores);
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado o sin cambios' });
      }
      // Respuesta exitosa
      return res.status(200).json({ message: 'Usuario actualizado correctamente' });
  
    } catch (error) {
      return next(error);
    }
  };

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

  // metodo para buscar por email a los usuarios
  buscarPorEmail = async (email) => {
    try {
      const query = 'SELECT * FROM usuarios WHERE email = ?';
      const [users] = await this.Conexion.query(query, [email]);
  
      if (users.length > 0) {
        return users[0]; // Devuelve el usuario encontrado
      }
      return null; // Devuelve null si no se encuentra el usuario
    } catch (error) {
      throw error;
    }
  }

}


export default UserService;