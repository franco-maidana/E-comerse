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
}

export default UserService;
