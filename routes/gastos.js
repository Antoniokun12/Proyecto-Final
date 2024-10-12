import { Router } from "express";
import httpGastos from "../controllers/gastos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar", httpGastos.getGastos);
router.get("/listarid/:id", httpGastos.getGastosID);
router.post("/escribir",  httpGastos.postGastos),
router.put( "/modificar/:id",  httpGastos.putGastos)

export default router