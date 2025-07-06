import { Router} from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { Product } from "../models/Products";

const router = Router();

router.post('/',verifyToken,addProduct); //Agregar un producto
router.delete('/:id',verifyToken,deleteProduct); //Borrar un producto
router.put('/:id', verifyToken, updateProduct); //actualizar un producto
router.get('/',getProducts); //Obtener todos los productos
router.get('/:id',getProduct); //Obtner un solo producto por id

export default router;