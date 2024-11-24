import { Router } from "express";
import Conexion from "../../utils/ConexionMySQL.js";
import { crear } from '../../controllers/producto.controllers.js'
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

const productoRouter = Router();


productoRouter.post('/create', upload.single('imagen'), crear  );

export default productoRouter;
