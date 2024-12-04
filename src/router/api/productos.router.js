import CustomRouter from '../customRouter.js';
import { crear, eliminar, listar, listarId, modificar } from '../../controllers/producto.controllers.js'
import multer from "multer";
import path from "path";
import fs from "fs";




const uploadDir = path.join(process.cwd(), 'uploads/producto'); 

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); 
    cb(null, file.fieldname + '-' + Date.now() + extension); 
  },
});

const upload = multer({ storage: storage });

class productoRouter extends CustomRouter {
  init(){
    this.create('/create' , ['ADMIN', 'PREM'] ,upload.single('imagen'), crear  )  // funciona
    this.listar('/products', ['USUARIO'] ,listar ) // funciona
    this.listar('/products/:id', ['ADMIN', 'PREM'],listarId )  // funciona
    this.modificar('/update/:id', ['ADMIN', 'PREM'] ,modificar)  // funciona
    this.eliminar('/drop/:id', ['ADMIN', 'PREM'] ,eliminar) // funciona
  }
}


export default productoRouter;
