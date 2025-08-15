import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button} from 'reactstrap'

function ListadoDetalle({lista,toggleModalEditar,deleteDetalle}){

    return(
        <Table>
          <thead>
            <tr>
              <th>Numero de detalle</th>
              <th>Numero de factura</th>
              <th>Fecha de emision</th>
              <th>Cantidad</th>
              <th>Numero de articulo</th>
              <th>Nombre de articulo</th>
              <th></th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((e) => (
              <tr key={e.NumeroDetalle}>
                <td>{e.NumeroDetalle}</td>
                <td>{e.NumeroFactura}</td>
                <td>{e.FechaEmision}</td>
                <td>{e.Cantidad}</td>
                <td>{e.NumeroArticulo}</td>
                <td>{e.NombreArticulo}</td>
                <td>
                  <Button color="primary" onClick={() => toggleModalEditar(e)}>
                    Editar
                  </Button>
                </td>
                <td>
                  <Button color="danger" onClick={() => deleteDetalle(e.NumeroDetalle)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export {ListadoDetalle}