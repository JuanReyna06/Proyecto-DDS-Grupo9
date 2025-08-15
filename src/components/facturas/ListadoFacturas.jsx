import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button} from 'reactstrap';

function ListaFactruras({lista,toggleModalEditar,deleteFactura}){
    
    return(
        <Table>
          <thead>
            <tr>
              <th>IdFactua</th>
              <th>Fecha de emision</th>
              <th>ID del Cliente</th>
              <th>Tipo </th>
              <th>ID del detalle</th>
              <th></th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((e) => (
              <tr key={e.IdFactura}>
                <td>{e.IdFactura}</td>
                <td>{e.FechaEmision}</td>
                <td>{e.Cliente}</td>
                <td>{e.Tipo}</td>
                <td>{e.Detalle}</td>
                <td>
                  <Button color="primary" onClick={() => toggleModalEditar(e)}>
                    Editar
                  </Button>
                </td>
                <td>
                  <Button color="danger" onClick={() => deleteFactura(e.IdFactura)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export {ListaFactruras}