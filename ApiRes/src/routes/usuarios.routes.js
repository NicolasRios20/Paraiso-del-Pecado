import { Router } from "express";
import { methods as usuariosController } from "../controllers/usuarios.controller";

const router = Router();

router.get("/", usuariosController.getAll);
router.post("/", usuariosController.add);
router.post('/email', usuariosController.verificaruser);


export default router;
