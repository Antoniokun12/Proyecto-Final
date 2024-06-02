import express from "express";
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js";
import administrador from "./routes/administrador.js"

const app = express();
app.use(express.json());
app.use("/api/administrador", administrador)

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
})


