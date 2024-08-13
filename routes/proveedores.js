import { Router } from "express";
import httpProveedores from "../controllers/proveedores.js";
import helpersProveedores from "../helpers/proveedores.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar", [validarJWT], httpProveedores.getProveedores);
router.get("/listarid/:id", [validarJWT], httpProveedores.getProveedoresID);
router.get("/listaractivados", [validarJWT], httpProveedores.getProveedoractivado)
router.get("/listardesactivados", [validarJWT], httpProveedores.getProveedordesactivado)
router.post("/escribir", [
  validarJWT,
  check("nombre", "nombre no puede estar vacio").notEmpty().isString(),
  check("direccion", "direccion no puede estar vacio").notEmpty().isString(),
  check("telefono", "telefono no puede estar vacio").notEmpty().isMobilePhone(),
  check("email", "email no puede estar vacio").notEmpty().isEmail().withMessage('email debe ser válido'),
  check("email").custom(helpersProveedores.correoExiste),
  validarCampos
], httpProveedores.postProveedores),
  router.put("/modificar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProveedores.validarExistaId),
    check("nombre", "nombre no puede estar vacio").notEmpty().isString(),
    check("direccion", "direccion no puede estar vacio").notEmpty().isString(),
    check("telefono", "telefono no puede estar vacio").notEmpty().isMobilePhone(),
    check("email", "email no puede estar vacio").notEmpty().isEmail().withMessage('email debe ser válido'),
    check("email").custom((correo, { req }) => helpersProveedores.correoExisteExceptoPropio(correo, req.params.id)),
    validarCampos
  ], httpProveedores.putProveedores
  ),
  router.put("/activar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProveedores.validarExistaId),
    validarCampos
  ], httpProveedores.putProveedoresActivar
  ),
  router.put("/desactivar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProveedores.validarExistaId),
    validarCampos
  ], httpProveedores.putProveedoresDesactivar
  )

export default router