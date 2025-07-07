import { Router} from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { createOrder, deleteOrder, getOrderByCode, getOrderById, getOrders, updateStatusOrder } from "../controllers/order.controllers";


const router = Router();

router.post('/',createOrder); //El cliente creará una orden de compra
router.get('/',verifyToken,getOrders); //El admin pordra ver las ordenes
router.get('/code/:code', getOrderByCode); //El cliente podrá consultar el estado de su orden
router.get('/:id', verifyToken, getOrderById); //El admin podra ver una orden individual
router.delete('/:id',verifyToken,deleteOrder) //El admin podrá eliminar las ordenes
router.put('/:id',verifyToken,updateStatusOrder) //Actualizar el estado de la orden

export default router;