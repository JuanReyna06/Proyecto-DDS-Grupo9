const express = require('express');
const BD = require('../base-orm/db.js');
const { Op, ValidationError } = require('sequelize');


const router = express.Router();

router.get('/api/detalleFacturas', async function (req, res) {
    let filtro = req.query.filtro
    console.log(filtro)
    if(!filtro){
        filtro=''
    }

    let data = await BD.models.DetalleFacturas.findAll({
        attributes: [
            'NumeroDetalle',
            'NumeroFactura',
            'FechaEmision',
            'Cantidad',
            'NumeroArticulo',
            'NombreArticulo',
        ],
        where:{
            NombreArticulo : {[Op.like]: `${filtro}%`}
        }
    });
    console.log(data);
    res.json(data);
});


router.get('/api/detalleFacturas/:numeroDetalle', async function(req,res){

    let detalleFactura = await BD.models.DetalleFacturas.findOne({
        attributes: [
            'NumeroDetalle',
            'NumeroFactura',
            'FechaEmision',
            'Cantidad',
            'NumeroArticulo',
            'NombreArticulo',
        ],
        where : {NombreArticulo : req.params.NombreArticulo}
    })

    if(detalleFactura){
        res.json(detalleFactura)
    }else{
        res.status(404).json({message : "no encontro la factura" })
    }
 })

 router.post('/api/detalleFacturas/', async function(req,res){
    try{
        let data = await BD.models.DetalleFacturas.create({
            NumeroFactura : req.body.NumeroFactura,
            FechaEmision : req.body.FechaEmision,
            Cantidad : req.body.Cantidad,
            NumeroArticulo: req.body.NumeroArticulo,
            NombreArticulo: req.body.NombreArticulo,
        })

        res.status(200).json(data)
    }catch(err){
        if(err instanceof ValidationError){
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({message : messages});
        }else{
            throw err
        }
    }
})

router.put('/api/detalleFacturas/:numeroDetalle', async function(req,res){
    try {
        let detalleFactura = await BD.models.DetalleFacturas.findOne({
            attributes:[
                'NumeroDetalle',
                'NumeroFactura',
                'FechaEmision',
                'Cantidad',
                'NumeroArticulo',
                'NombreArticulo',
            ],
            where : [{NumeroDetalle : req.params.numeroDetalle}],

        })

        if(detalleFactura){
            const {NumeroFactura,FechaEmision,Cantidad,NumeroArticulo,NombreArticulo} = req.body
            detalleFactura.NumeroFactura = NumeroFactura,
            detalleFactura.FechaEmision = FechaEmision,
            detalleFactura.Cantidad = Cantidad,
            detalleFactura.NumeroArticulo = NumeroArticulo,
            detalleFactura.NombreArticulo = NombreArticulo,

            await detalleFactura.save()
            res.status(200).json({message:"factura modificada"})
        }else{
            res.status(404).json({message: "factura no encontrada"})
        }
    }catch(err){
        if(err instanceof ValidationError){
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({message : messages});
        }else{
            throw err
        }
    }
})

router.delete("/api/detalleFacturas/:numeroDetalle", async function (req, res, next) {
    let data = await BD.models.DetalleFacturas.destroy({
        where: { NumeroDetalle: req.params.numeroDetalle},
      });
      if (data===1) res.sendStatus(200);
      else res.sendStatus(404);
  });

module.exports = router;
