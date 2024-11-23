import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config() // Cargamos las variables de entorno

const Conexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

if(Conexion){
  console.log('Ha conectado a la base de datos de  MySQL')
}else(
  console.log('Error en la conexion a la base de datos de MySQL')
)

export default Conexion

