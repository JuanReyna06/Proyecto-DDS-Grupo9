import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { buscarCliente, insertarCliente, eliminarCliente, actualizarCliente  } from '../../services/clientes.services'
import { ListadoClientes } from './ListadoClientes';
import { FormularioClientes } from './FormularioClietes';


function Cliente() {
  const [lista, setLista] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [nuevoCliente, setNewCliente] = useState({
    nombre: '',
    fechaNac: '',
    telefono: ''
  });
  const [clienteEditado, setClienteEditado] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const filtro = ""
  const fetchClientes = () => {
    buscarCliente(filtro)
      .then((data) => setLista(data))
      .catch((error) => {
        console.log('Error al obtener la lista de clientes:', error);
      });
  };


  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const toggleModalEditar = (cliente) => {
    setClienteEditado(cliente);
    setModalEditar(!modalEditar);
  };

  const handleFiltroChange = (e) => {
    buscarCliente(e.target.value)
    .then((data) => setLista(data))
    .catch((error) => {
      console.log('Error al obtener la lista de clientes:', error);
    });
  };

  const handleInputChange = (e) => {
    setNewCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value
    });
  };

  const handleEditInputChange = (e) => {
    setClienteEditado({
      ...clienteEditado,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertarCliente(nuevoCliente)
      .then(() => {
        fetchClientes();
        setNewCliente({
          nombre: '',
          fechaNac: '',
          telefono: ''
        });
        setModalInsertar(false);
      })
      .catch((error) => {
        console.log('Error al insertar el cliente:', error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Realizar la actualización del cliente llamando a la función de servicio correspondiente
    // Se asume que tienes una función llamada actualizarCliente en el servicio de clientes
    actualizarCliente(clienteEditado)
      .then(() => {
        fetchClientes();
        setClienteEditado(null);
        setModalEditar(false);
      })
      .catch((error) => {
        console.log('Error al actualizar el cliente:', error);
      });
  };

  const deleteCliente = (id) => {
    eliminarCliente(id)
      .then(() => {
        fetchClientes();
      })
      .catch((error) => {
        console.log('Error al eliminar el cliente:', error);
      });
  };

  return (
    <div>
      <Container>
        <br />
        <FormularioClientes handleFiltroChange={handleFiltroChange}></FormularioClientes>
        <br />
        <Button color="success" onClick={toggleModalInsertar}>
          Insertar nuevo cliente
        </Button>
        <br />
        <br />
        <ListadoClientes lista={lista} toggleModalEditar={toggleModalEditar} deleteCliente={deleteCliente}></ListadoClientes>
      </Container>

      {/* Modal de inserción */}
      <Modal isOpen={modalInsertar} toggle={toggleModalInsertar}>
        <ModalHeader toggle={toggleModalInsertar}>Insertar nuevo cliente</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Nombre del Cliente</label>
              <input
                type="text"
                name="nombre"
                value={nuevoCliente.nombre}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: "none" }}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNac"
                value={nuevoCliente.fechaNac}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: "none" }}
              />
            </FormGroup>
            <FormGroup>
              <label>Telefono</label>
              <input
                type="text"
                name="telefono"
                value={nuevoCliente.telefono}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: "none" }}
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">
                Insertar
              </Button>{" "}
              <Button color="secondary" onClick={toggleModalInsertar}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      {/* Modal de edición */}
      <Modal isOpen={modalEditar} toggle={toggleModalEditar}>
        <ModalHeader toggle={toggleModalEditar}>Editar cliente</ModalHeader>
        {clienteEditado && (
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <FormGroup>
                <label>ID del Cliente</label>
                <input
                  type="text"
                  name="idCliente"
                  value={clienteEditado.idCliente}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: "none" }}
                />
              </FormGroup>
              <FormGroup>
                <label>Nombre del Cliente</label>
                <input
                  type="text"
                  name="nombre"
                  value={clienteEditado.nombre}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: "none" }}
                />
              </FormGroup>
              <FormGroup>
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fechaNac"
                  value={clienteEditado.fechaNac}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: "none" }}
                />
              </FormGroup>
              <FormGroup>
                <label>Telefono</label>
                <input
                  type="text"
                  name="telefono"
                  value={clienteEditado.telefono}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: "none" }}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Actualizar
                </Button>{" "}
                <Button color="secondary" onClick={toggleModalEditar}>
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        )}
      </Modal>
    </div>
  );
}

export { Cliente };
