import { Router} from "express";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.cotroller";
import { verifyToken } from "../middlewares/authMiddleware";


const router = Router();

router.get('/',getCategories); //Obtener categorias
router.post('/',verifyToken ,addCategory); //Crear categoria
router.delete('/:id',verifyToken,deleteCategory) //Borra categoria
router.put('/:id',verifyToken,updateCategory) //Actualizar categoria

export default router;