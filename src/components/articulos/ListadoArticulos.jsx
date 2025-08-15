import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button} from 'reactstrap';

function ListadoArticulos({lista, toggleModalEditar,deleteArticulo}){
    return(<Table>
        <thead>
          <tr>
            <th>IdArticulo</th>
            <th>Nombre de Articulo</th>
            <th>Fecha de Alta</th>
            <th>Stock</th>
            <th></th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((e) => (
            <tr key={e.IdArticulo}>
              <td>{e.IdArticulo}</td>
              <td>{e.Nombre}</td>
              <td>{e.FechaAlta}</td>
              <td>{e.Stock}</td>
              <td>
                <Button color="primary" onClick={() => toggleModalEditar(e)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button color="danger" onClick={() => deleteArticulo(e.IdArticulo)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>)
}
export {ListadoArticulos}