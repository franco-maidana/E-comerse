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

  listado = async(req,res,next) => {
    try {
      const consulta = 'SELECT * FROM productos' 
      const [productos] = await Conexion.query(consulta)
  
      return res.status(201).json({message: "Listado de productos", productos: productos})
    } catch (error) {
      return next(error)
    }
  }

  listadoId = async(req,res,next) => {
    try {
      const {id} = req.params
      const consulta = 'SELECT * FROM productos WHERE id = ?'
      const [producto] = await Conexion.query(consulta, [id])
  
      if(producto.length > 0){
        return res.status(200).json({message: 'Prodcutos encontrado', productos: producto[0]})
      }else {
        return res.status(404).json({ message: 'Usuario no encontrado en la base de datos'})
      }
    } catch (error) {
      return next(error)
    }
  }

  modificar = async (req,res,next) => {
    try {
      const {id} = req.params
      const { product, marca, modelo, price, stock } = req.body

      let campos = [];
      let value = [];

      if(product){campos.push('product = ?'), value.push(product)};
      if(marca){campos.push('marca = ?'), value.push(marca)};
      if(modelo){campos.push('modelo = ?'), value.push(modelo)};
      if(price){campos.push('price = ?'), value.push(price)};
      if(stock){campos.push('stock = ?'), value.push(stock)};

      if(campos.length === 0){
        return res.status(400).json({message: "No se proporcionarion campos para modificar "})
      }

      const consulta = `UPDATE productos SET  ${campos.join(' ')} WHERE id = ?`
      value.push(id)

      const [resultado] = await Conexion.query(consulta, value)

      if(resultado.affectedRows === 0){
        return res.status(404).json({message: "Producto no encontrado o sin cambion"})
      }

      return res.status(200).json({message: 'Producto actualizado correctamente '})

    } catch (error) {
      return next(error)
    }
  }

  eliminar = async (req,res,next) => {
    try {
      const {id} = req.params
      const consulta = 'DELETE FROM productos WHERE id = ?'
      const [resultado] = await Conexion.query(consulta, [id])

      if(resultado.affectedRows === 0){
        return res.status(404).json({
          message: 'Producto no encontrado o ya eliminado'
        })
      }
      // respuesta de exito
      return res.status(200).json({
        message: 'Producto eliminado correctamente'
      })

    } catch (error) {
      return next(error)
    }
  }
}

export default ProductoService;
