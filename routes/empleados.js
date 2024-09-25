import { Router } from "express";
import httpEmpleados from "../controllers/empleados.js";
import helpersEmpleados from "../helpers/empleados.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/listar", [validarJWT], httpEmpleados.getEmpleados);
router.get("/listarporfinca/:idFinca", httpEmpleados.getEmpleadosByFinca);
router.get("/listarid/:id", [validarJWT], httpEmpleados.getEmpleadosID);
router.get("/listaractivados", [validarJWT], httpEmpleados.getEmpleadoactivado)
router.get("/listardesactivados", [validarJWT], httpEmpleados.getEmpleadodesactivado)

router.post("/escribir", [
  validarJWT,
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("documento").custom(helpersEmpleados.documentoExiste),
  check("documento").isLength({ min: 8 }).withMessage('documento debe tener al menos 8 caracteres'),
  check("correo", "correo no puede estar vacio").notEmpty().isEmail().withMessage('email debe ser válido'),
  check("correo").custom(helpersEmpleados.correoExiste),
  // check('password', 'La contraseña debe contener al menos tres letras y tres números').custom(helpersEmpleados.validarPassword),
  check("direccion", "direccion no puede estar vacia").notEmpty(),
  check("fechaNacimiento", "fechaNacimiento no puede estar vacio").notEmpty(),
  check("estudios", "estudios no puede estar vacio").notEmpty(),
  check("descripcion", "descripcion no puede estar vacio").notEmpty(),
  // check("fechaContratacion", "fechaContratacion no puede estar vacia").notEmpty(),
  // check("fechaNacimiento", "fechaNacimiento debe ser una fecha válida").isISO8601().toDate(),
  check("telefono", "telefono no puede estar vacio").notEmpty().isMobilePhone(),
  validarCampos
], httpEmpleados.postEmpleados),

  router.put("/modificar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersEmpleados.validarExistaId),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
    check("documento").custom((documento, { req }) => helpersEmpleados.documentoExisteExceptoPropio(documento, req.params.id)),
    check("documento").isLength({ min: 8 }).withMessage('documento debe tener al menos 8 caracteres'),
    check("correo", "correo no puede estar vacio").notEmpty().isEmail().withMessage('correo debe ser válido'),
    check("correo").custom((correo, { req }) => helpersEmpleados.correoExisteExceptoPropio(correo, req.params.id)),
    check("direccion", "direccion no puede estar vacia").notEmpty(),
    check("fechaNacimiento", "fechaNacimiento no puede estar vacio").notEmpty(),
    check("estudios", "estudios no puede estar vacio").notEmpty(),
    check("descripcion", "descripcion no puede estar vacio").notEmpty(),
    // check("fechaContratacion", "fechaContratacion no puede estar vacia").notEmpty(),
    // check("fechaContratacion", "fechaContratacion debe ser una fecha válida").isISO8601().toDate(),
    check("telefono", "telefono no puede estar vacio").notEmpty().isMobilePhone(),
    validarCampos
  ], httpEmpleados.putEmpleados
  ),
  router.put("/activar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersEmpleados.validarExistaId),
    validarCampos
  ], httpEmpleados.putEmpleadosActivar
  ),
  router.put("/desactivar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersEmpleados.validarExistaId),
    validarCampos
  ], httpEmpleados.putEmpleadosDesactivar
  )

export default router