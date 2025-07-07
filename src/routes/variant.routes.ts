import { Router} from "express";
;
import { verifyToken } from "../middlewares/authMiddleware";
import { addVariant, deleteVariant, getVariant, getVariantsByProduct, updateVariant } from "../controllers/variant.controller";


const router = Router();

router.post('/', verifyToken, addVariant); // Crear una variante
router.get('/:id', getVariant); // Obtener una variante por ID
router.put('/:id', verifyToken, updateVariant); // Actualizar variante
router.delete('/:id', verifyToken, deleteVariant); // Eliminar variante
router.get('/product/:productId', getVariantsByProduct); // Variantes de un producto

export default router;