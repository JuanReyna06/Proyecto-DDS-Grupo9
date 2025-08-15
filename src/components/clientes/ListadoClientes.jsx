import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button} from 'reactstrap';

function ListadoClientes({lista,toggleModalEditar,deleteCliente}){

return(
    <Table>
    <thead>
      <tr>
        <th>IdCliente</th>
        <th>Nombre</th>
        <th>Fecha de Nacimiento</th>
        <th>Telefono</th>
        <th></th>
        <th >Acciones</th>
      </tr>
    </thead>
    <tbody>
      {lista.map((e) => (
        <tr key={e.IdCliente}>
          <td>{e.IdCliente}</td>
          <td>{e.Nombre}</td>
          <td>{e.FechaNac}</td>
          <td>{e.Telefono}</td>

          <td>
            <Button color="primary" onClick={() => toggleModalEditar(e)}>Editar</Button>
          </td>
          <td>
            <Button color="danger" onClick={() => deleteCliente(e.IdCliente)}>Eliminar</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)
}
export {ListadoClientes}