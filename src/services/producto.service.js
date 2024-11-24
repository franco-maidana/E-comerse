import Conexion from "../utils/ConexionMySQL.js";

class ProductoService {
  constructor() {
    this.Conexion = Conexion;
  }

  crear = async (req, res, next) => {
    try {
      const { product, marca, modelo, price, stock } = req.body;
      console.log(product, marca, modelo, price, stock )
      // Validar que todos los campos estén presentes
      if (!product || !marca || !modelo || !price || !stock) {
        return res.status(400).json({
          message: 'Faltan datos por enviar'
        });
      }
      // Consulta para insertar el producto
      const query = 'INSERT INTO productos (product, marca, modelo, price, stock) VALUES (?, ?, ?, ?, ?)';
      const values = [product, marca, modelo, price, stock];
      // Ejecutar la consulta de inserción
      const [resultado] = await this.Conexion.query(query, values);
      // Consulta para obtener el producto recién creado
      const queryProducts = 'SELECT id, product, marca, modelo, price, stock FROM productos WHERE id = ?';
      const [producto] = await this.Conexion.query(queryProducts, [resultado.insertId]);
      // Respuesta correcta con los datos del producto creado
      return res.status(201).json({
        message: 'Producto creado exitosamente',
        producto: producto[0]  // Devuelve los datos del producto creado
      });
    } catch (error) {
      return next(error);  // Manejo de errores
    }
  }
}

export default ProductoService;
