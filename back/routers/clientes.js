const express = require("express")
const BD = require("../base-orm/db.js")
const { Op } = require('sequelize')

const router = express.Router()

// router.get("/api/clientes", async (req, res) => {
//     try {
//         const resultado = await BD.models.Clientes.findAll({
//             attributes: [
//                 'IdCliente',
//                 'Nombre',
//                 'FechaNac',
//                 'Telefono',],
//             order: [["IdCliente", 'ASC']]
//         })
//         if (resultado) {
//             console.log(resultado)
//             res.json(resultado)
//         } else {
//             res.status(404).json({ message: 'cliente no encontrado' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'Error en el servidor' });
//     }
// }
// )

router.get("/api/clientes/:idCliente", async (req, res) => {
    try {
        let { idCliente } = req.params
        const resultado = await BD.models.Clientes.findOne({
            attributes: [
                'IdCliente',
                'Nombre',
                'FechaNac',
                'Telefono',],
            where: { IdCliente: idCliente },
            order: [["Nombre", 'ASC']]
        })
        if (resultado) {
            res.json(resultado)
        } else {
            res.status(404).json({ message: 'cliente no encontrado' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
    }

}
)

router.get("/api/clientes", async (req, res) => {
    try {
        const filtro = req.query.filtro;

        console.log("Entro")
        console.log(filtro)

        let where = {}

        if (filtro !== undefined) {
            where = { Nombre: { [Op.like]: `%${filtro}%` } }
        }else{
            filtro = ""
        }

        console.log(filtro)
        
        const resultado = await BD.models.Clientes.findAll({
            attributes: [
                'IdCliente',
                'Nombre',
                'FechaNac',
                'Telefono',],
            where,
            order: [["IdCliente", "ASC"]]
        })

        if (resultado) {
            res.status(200).json(resultado)
        } else {
            res.status(404).json({ message: 'cliente no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor gil' });
    }
})

router.put("/api/clientes", async (req, res) => {
    try {

        console.log(req.body)
        const cliente = await BD.models.Clientes.findOne({
            where: [{ IdCliente: req.body.idCliente }],
        });
        if (!cliente) {
            res.status(404).json({ message: 'cliente no encontrado' });
        } else {
            const { nombre, fechaNac, telefono } = req.body
            cliente.Nombre = nombre
            cliente.FechaNac = fechaNac
            cliente.Telefono = telefono

            await cliente.save()
            res.status(200).json({ message: 'cliente modificado' });
        }

    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n'));
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }

}
)

router.post("/api/clientes", async (req, res) => {
    try {

        const cliente = req.body
        const resultado = await BD.models.Clientes.create({
            Nombre: cliente.nombre,
            FechaNac: cliente.fechaNac,
            Telefono: cliente.telefono,
        })
        res.status(200).send(resultado)
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n'));
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }

}
)

router.delete("/api/clientes/delete/:idCliente", async (req, res) => {
    try {
        const resultado = await BD.models.Clientes.destroy({
            where: [{ IdCliente: req.params.idCliente }],
        })
        if (resultado === 1) {
            res.status(200).json({ message: 'se elimino la fila' });
        } else {
            res.status(404).json({ message: 'cliente no encontrado' });
        }

    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n'));
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }

}
)

module.exports = router