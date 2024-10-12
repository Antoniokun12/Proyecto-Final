import { Router } from "express";
import httpSemillas from "../controllers/semillas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check, body } from "express-validator";


const router = Router();

router.get("/listar", httpSemillas.getSemillas);
router.get("/listarid/:id", httpSemillas.getSemillasID);
router.get("/listaractivados", httpSemillas.getSemillasactivado);
router.get("/listardesactivados", httpSemillas.getSemillasdesactivado);
router.post("/escribir", httpSemillas.postSemillas);
router.put("/modificar/:id", httpSemillas.putSemillas);
router.put("/activar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    // check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
], httpSemillas.putSemillasActivar
);
router.put("/desactivar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    // check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
], httpSemillas.putSemillasDesactivar
)


export default router