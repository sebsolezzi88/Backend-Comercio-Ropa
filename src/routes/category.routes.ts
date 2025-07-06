import { Router} from "express";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.cotroller";
import { verifyToken } from "../middlewares/authMiddleware";


const router = Router();

router.get('/',getCategories); //Obtener categorias
router.post('/',verifyToken ,addCategory); //Crear categoria
router.delete('/',deleteCategory) //Borra categoria
router.put('/',updateCategory) //Actualizar categoria

export default router;