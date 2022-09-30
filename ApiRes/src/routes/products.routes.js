import { Router } from "express";
import { methods as productosController } from "../controllers/products.controller";

const router = Router();

router.get("/", productosController.getAll);
router.get("/:id", productosController.getById);//obtener por id
router.post("/", productosController.add);
router.put("/:id", productosController.updateById);//obtener por id
router.delete("/:id", productosController.deleteById);//obtener por id

export default router;
