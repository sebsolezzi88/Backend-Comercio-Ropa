import { Router} from "express";
import { createUser, getToken } from "../controllers/admin.controller";

const router = Router();

router.post('/register', createUser); //Crear usuario
router.post('/login',getToken); //Crear Token

export default router;