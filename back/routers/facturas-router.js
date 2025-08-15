const express = require('express');
const BD = require( "../base-orm/db.js");
const { Op } = require( "sequelize");

const facturaRouter= express.Router()

facturaRouter.get('/api/facturas',async (req,res,next) => {
    const data = await BD.models.Facturas.findAll({
        attributes: [
            'IdFactura',
            'FechaEmision',
            'Cliente',
            'Tipo',
            'Detalle'
            
        ],
        order: [['IdFactura', 'ASC']]

    })
    console.log(data)
    res.json(data)
    next
})

// facturaRouter.get('/api/facturas/:idFactura',async (req,res,next) => {
//     const numeroFactura = req.params.idFactura; //guardamos lo que nos vino como parametro

//   try {
//     const data = await BD.models.Facturas.findAll({
//       where: {
//         IdFactura: numeroFactura //condicion 
//       },
//       attributes: ['IdFactura', 'FechaEmision', 'Cliente', 'Tipo', 'Detalle'],
//       order: [['IdFactura', 'ASC']]
//     });

//     console.log(data);
//     res.json(data);
  
//     } catch (error) { //si no encuentra ninguna
//     console.error(error);
//     res.status(500).json({ error: 'Error al buscar las facturas' });
//   }
// })

facturaRouter.post('/api/facturas', async (req, res, next) => {
    const { IdFactura, FechaEmision, Cliente, Tipo, Detalle } = req.body; //desenpaqueta los elementos del body
  
    try {
      
      const nuevaFactura = await BD.models.Facturas.create({ //crea una nueva instancia de factura
        
        FechaEmision,
        Cliente,
        Tipo,
        Detalle
      });
  
      res.status(200).json(nuevaFactura); //mensaje de exito 
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la factura' }); //mensaje de error
    }
  });
  
  facturaRouter.put('/api/facturas/:idFactura', async (req, res) => { //funcionando perfecto
    const id = req.params.idFactura;
    const {FechaEmision, Cliente, Tipo, Detalle }= req.body
    
    const factura = await BD.models.Facturas.findOne({
      where: { IdFactura: id }
    });
  
    if (!factura) {
      return res.send("No hay facturas con ese id");
    }
  
    const updateFactura = await BD.models.Facturas.update(
      {
        FechaEmision: FechaEmision,
        Cliente: Cliente,
        Tipo: Tipo,
        Detalle: Detalle
      },
      {
        where: { IdFactura: id }
      }
    );
  
    console.log(updateFactura);
    res.send({ IdFactura: id });
  });

  facturaRouter.delete('/api/facturas/:idFactura', async (req, res) =>{
    const id = req.params.idFactura;
    const resultado = await BD.models.Facturas.destroy({
      where: { IdFactura: id }
    })
    if (resultado === 0) {
      return res.send("No se encontró la factura con ese id");
    }
  
    // Se eliminó correctamente
    return res.send("Factura eliminada correctamente")
    
  })
  
  facturaRouter.get('/api/facturas/:filtro', async function (req, res) {
    let filtro = req.params.filtro
    console.log(filtro)
    if(!filtro){
        filtro=''
    }

    let data = await BD.models.Facturas.findAll({
        
      attributes: [
        'IdFactura',
        'FechaEmision',
        'Cliente',
        'Tipo',
        'Detalle'
        
      ],
      where:{
            Tipo : {[Op.like]: `${filtro}%`}
        }
    });
    console.log(data);
    res.json(data);
});


module.exports = facturaRouter;