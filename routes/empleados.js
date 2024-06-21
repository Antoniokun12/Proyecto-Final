import { Router } from "express";
import httpEmpleados from "../controllers/empleados.js";
import helpersEmpleados from "../helpers/empleados.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/", httpEmpleados.getEmpleados);
router.get("/:id", httpEmpleados.getEmpleadosID);
router.post("/", [
    validarCampos
  ], httpEmpleados.postEmpleados),
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersEmpleados.validarExistaId),
    validarCampos
  ], httpEmpleados.putEmpleados
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersEmpleados.validarExistaId),
    validarCampos
  ], httpEmpleados.putEmpleados
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersEmpleados.validarExistaId),
    validarCampos
  ], httpEmpleados.putEmpleadosActivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router