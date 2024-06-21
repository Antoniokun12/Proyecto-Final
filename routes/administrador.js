import { Router } from "express";
import httpAdministrador from "../controllers/administrador.js";
import helpersAdministrador from "../helpers/administrador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get("/", httpAdministrador.getAdmin);
router.get("/:id", httpAdministrador.getAdminID);
router.post("/", [
    validarJWT,
    check("cedula", "cc no puede estar vacio").notEmpty(),
    check("cedula").isLength({ min: 8 }),
    validarCampos
  ], httpAdministrador.postAdmin),
  router.post("/login", [
    check('email', "Debe ingresar el email").notEmpty(),
    check('password', "Debe ingresar la password").notEmpty(),
    validarCampos
],httpAdministrador.login)
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
  ], httpAdministrador.putAdmin
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
  ], httpAdministrador.putAdminActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
  ], httpAdministrador.putAdminDesactivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router