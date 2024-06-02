import Siembra from "../models/siembra.js";

const httpSiembra = {

    getSiembra: async (req, res) => {
        const siembra = await Siembra.find()
        res.json({siembra})
    },

    getSiembraID: async (req, res) => {
        const { id } = req.params
        const siembras = await Siembra.findById(id)
        res.json({ siembras })
    },

    postSiembra: async (req, res) => {
        try {
        const {idcultivos,  idempleados, idinventario, fechasiembra,fechacosecha, transplante, CultivoAnterior} = req.body
        const siembra = new Siembra({idcultivos,  idempleados, idinventario, fechasiembra,fechacosecha, transplante, CultivoAnterior})
        await siembra.save()
        res.json({ siembra })
    }catch (error) {
        res.status(400).json({ error: "No se pudo crear el registro" })
    }
    },

    putSiembra: async (req, res) => {
        const { id } = req.params
        const { _id, fecha, ...resto } = req.body
        console.log(resto);

        const siembra = await Siembra.findByIdAndUpdate(id, resto, { new: true })
        res.json({ siembra })
    },

}
export default httpSiembra