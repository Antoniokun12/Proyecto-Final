import { Router } from "express";
import httpAdministrador from "../controllers/administrador.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import helpersAdministrador from "../helpers/administrador.js";


const router = Router();

router.get("/listar", [validarJWT], httpAdministrador.getAdmin);
router.get("/listarid/:id", httpAdministrador.getAdminID);
router.get("/listaractivados", httpAdministrador.getAdministradoractivado)
router.get("/listardesactivados", httpAdministrador.getAdministradordesactivado)
router.get("/email", [
  check('email', 'El email debe estar bien escrito.').isEmail(),
  check('email').custom(helpersAdministrador.Noexisteelcorreo),
  validarCampos
], httpAdministrador.getemail);

router.post("/escribir", [
  check("cedula", "La cédula no puede estar vacía y debe ser numérica").notEmpty().isNumeric(),
  check("cedula").isLength({ min: 8 }).withMessage('La cédula debe tener al menos 8 caracteres'),
  check("cedula").custom(helpersAdministrador.cedulaExiste),
  check("password", "tres letras y tres numeros").custom(helpersAdministrador.validarPassword),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("direccion", "la direccion no puede estar vacio").notEmpty(),
  check("email", "email no puede estar vacio").notEmpty().isEmail().withMessage('email debe ser válido'),
  check("email").custom(helpersAdministrador.emailExiste),
  validarCampos
], httpAdministrador.postAdmin);

router.post("/login", [
  check('email', 'El email debe estar bien escrito.').isEmail(),
  check('email').custom(helpersAdministrador.Noexisteelcorreo),
  validarCampos
], httpAdministrador.login)

router.post("/recuperar-password", [
  check('email', 'El email debe estar bien escrito.').isEmail(),
  validarCampos
], httpAdministrador.recuperarPassword);


router.put("/modificar/:id", [
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(helpersAdministrador.validarExistaId),
  check("cedula", "La cédula no puede estar vacía y debe ser numérica").notEmpty().isNumeric(),
  check("cedula").isLength({ min: 8 }).withMessage('La cédula debe tener al menos 8 caracteres'),
  check("cedula").custom((cedula, { req }) => helpersAdministrador.cedulaExisteExceptoPropio(cedula, req.params.id)),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("municipio", "municipio no puede estar vacio").notEmpty(),
  check("direccion", "la direccion no puede estar vacio").notEmpty(),
  check("email", "email no puede estar vacio").notEmpty().isEmail().withMessage('email debe ser válido'),
  check("email").custom((email, { req }) => helpersAdministrador.emailExisteExceptoPropio(email, req.params.id)),
  validarCampos
], httpAdministrador.putAdmin
),
  router.put("/activar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
  ], httpAdministrador.putAdminActivar
  ),
  router.put("/desactivar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
  ], httpAdministrador.putAdminDesactivar
  )




export default router