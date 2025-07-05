import { Router} from "express";
import { createUser } from "../controllers/admin.controller";

const router = Router();

router.post('/', createUser);

export default router;