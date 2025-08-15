const express = require('express');
const BD = require('../base-orm/db.js');
const {ValidationError, Op } = require('sequelize');

const router = express.Router();

router.get('/api/articulos', async function (req, res) {
    let filtro = req.query.filtro
    console.log(filtro)
    if(!filtro){
        filtro=''
    }

    let data = await BD.models.Articulos.findAll({
        attributes: [
            'IdArticulo',
            'Nombre',
            'FechaAlta',
            'Stock'
        ],
        where:{
            Nombre : {[Op.like]: `${filtro}%`}
        }
    });
    console.log(data);
    res.json(data);
});

router.get('/api/articulos/:id', async function (req, res) {
    try {
        let articulo = await BD.models.Articulos.findOne({
            attributes: [
                'IdArticulo',
                'Nombre',
                'FechaAlta',
                'Stock'
            ],
            where: { IdArticulo: req.params.id }
        });

        if (articulo) {
            res.json(articulo);
        } else {
            res.status(404).json({ message: 'articulo no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.post('/api/articulos', async function (req, res) {
    try {
        let data = await BD.models.Articulos.create({
            IdArticulo: req.body.IdArticulo,
            Nombre: req.body.Nombre,
            FechaAlta: req.body.FechaAlta,
            Stock: req.body.Stock
        });
        res.status(200).send(data);
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n'));
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }
});

router.put('/api/articulos/:id', async function (req, res) {
    try {
        let articulo = await BD.models.Articulos.findOne({
            attributes: [
                'IdArticulo',
                'Nombre',
                'FechaAlta',
                'Stock'
            ],
            where: [{ IdArticulo: req.params.id }]
        });

        if (articulo) {
            const { Nombre, FechaAlta, Stock } = req.body;
            articulo.Nombre = Nombre;
            articulo.FechaAlta = FechaAlta;
            articulo.Stock = Stock;

            await articulo.save();
            res.status(200).json({ message: 'articulo modificado' });
        } else {
            res.status(404).json({ message: 'articulo no encontrado' });
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
});

router.delete('/api/articulos/:id', async (req, res) => {
    try {
        let borradas = await BD.models.Articulos.destroy({
            where: [{ IdArticulo: req.params.id }]
        });

        if (borradas === 1) {
            res.status(200).json({ message: 'se elimino la fila' });
        } else {
            res.status(404).json({ message: 'articulo no encontrado' });
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
});

module.exports = router;
