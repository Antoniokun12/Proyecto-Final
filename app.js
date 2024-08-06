import  express  from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import cors from 'cors';

////////////////////////////////////////////////////////////////
import Administrador from "./routes/administrador.js"
import AnalisisSuelo from "./routes/analisis_suelo.js"
import Clima from "./routes/clima.js" 
import Comprador from "./routes/comprador.js"
import ControlPlaga from "./routes/control_plagas.js"
import Cultivos from "./routes/cultivos.js"
import ElaboracionSustrato from "./routes/elaboracion_sustrato.js"
import Empleados from "./routes/empleados.js"
import Factura from "./routes/factura.js"
import Fertilizacion from "./routes/fertilizacion.js"
import fincas from "./routes/fincas.js"
import Gastos from "./routes/gastos.js"
import Insumos from "./routes/insumos.js"
import Inventario from "./routes/inventario.js"
import Mantenimiento from "./routes/mantenimiento.js"
import Maquinasherramienta from "./routes/maquinas&herramientas.js"
import Nomina from "./routes/nomina.js"
import Parcelas from "./routes/parcelas.js"
import Preparacion_suelo from "./routes/preparacion_suelo.js"
import Procesos from "./routes/procesos.js"
import Produccion from "./routes/produccion.js"
import Proveedores from "./routes/proveedores.js"
import Riego from "./routes/riego.js"
import Semillas from "./routes/semillas.js"
import Siembra from "./routes/siembra.js"

const app = express()
app.use(express.json())
app.use(cors());
/////////////////////////////////////////////////////////////////

app.use("/api/administrador",Administrador)
app.use("/api/analisis",AnalisisSuelo)
app.use("/api/clima",Clima)
app.use("/api/comprador",Comprador)
app.use("/api/cultivos",Cultivos)
app.use("/api/control",ControlPlaga)
app.use("/api/elaboracion",ElaboracionSustrato)
app.use("/api/empleados",Empleados)
app.use("/api/factura",Factura)
app.use("/api/fertilizacion",Fertilizacion)
app.use("/api/fincas",fincas)
app.use("/api/gastos",Gastos)
app.use("/api/insumos",Insumos)
app.use("/api/inventario",Inventario)
app.use("/api/mantenimiento",Mantenimiento)
app.use("/api/maquinasherramienta",Maquinasherramienta)
app.use("/api/nomina",Nomina)
app.use("/api/parcelas",Parcelas)
app.use("/api/preparacion_suelo",Preparacion_suelo)
app.use("/api/procesos",Procesos)
app.use("/api/produccion",Produccion)
app.use("/api/proveedores",Proveedores)
app.use("/api/riego",Riego)
app.use("/api/semillas",Semillas)
app.use("/api/siembra",Siembra)


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
})
