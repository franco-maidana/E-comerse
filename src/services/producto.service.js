import Conexion from "../utils/ConexionMySQL.js";

class ProductoService {
  constructor() {
    this.Conexion = Conexion;
  }

  crear = async (req, res, next) => {
    try {
      const { product, marca, modelo, price, stock } = req.body;
      const imagenPath = req.file ? req.file.path : null; // Asegurarse de que la imagen exista
      // Validación de campos obligatorios
      if (!product || !marca || !modelo || !price || !stock || !imagenPath) {
        return res.status(400).json({
          message: "Todos los campos son obligatorios, incluyendo la imagen",
        });
      }
      // Insertar los datos en la base de datos
      const consulta = 'INSERT INTO productos (product, marca, modelo, price, stock, imagen) VALUES (?,?,?,?,?,?)';
      const values = [product, marca, modelo, price, stock, imagenPath];
  
      const [ProductoNuevo] = await Conexion.query(consulta, values);
  
      return res.status(201).json({ message: "Producto creado exitosamente" });
    } catch (error) {
      return next(error);
    }
  }

}

export default ProductoService;
