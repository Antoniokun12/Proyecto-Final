import administrador from "../models/Administrador.js";

const httpAdministrador = {
    getAdmin: async (req, res) => {
        const {busqueda} = req.query
        const admin = await administrador.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ admin })
    },
    getAdminID: async (req, res) => {
        const {_id} = req.params
        const admin = await administrador.findById(_id)
        res.json({ admin })
    },
    postAdmin: async (req, res) => {
        try {
            const {nombre,cedula,direccion,correo,municipio,telefono}=req.body;
            const admin = new administrador({nombre,cedula,direccion,correo,municipio,telefono});
            await admin.save()
            console.log(admin);
            res.json({ message: "administrador creado ", administrador });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el administrador" })
        }

    },
    putAdmin:async (req, res) => {
        const {_id} = req.params;
        const {municipio, ...resto} = req.body;
        const admin = await administrador.findByIdAndUpdate(_id, municipio, {new: true});
        res.json(admin)
    },
    putAdminActivar:async (req,res) => {
        const {_id} = req.params
        const admin = await administrador.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ admin })
    },
    putAdminDesactivar:async (req,res) => {
        const { _id } = req.params
        const admin= await administrador.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({ admin })
    }
}

export default httpAdministrador