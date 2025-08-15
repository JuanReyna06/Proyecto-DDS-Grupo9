import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { buscarDetalle, insertarDetalle, eliminarDetalle, actualizarDetalle, buscarDetallePorNombre } from '../../services/detallesFactura.service.js';
import { ListadoDetalle } from './ListaDetalle';
import { FormularioDetalle } from './FormularioDetalle';


function DetalleFacturas() {
  const {  reset } = useForm();
  const [lista, setLista] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [nuevoDetalle, setNuevoDetalle] = useState({
    NumeroDetalle: '',
    NumeroFactura: '',
    FechaEmision: '',
    Cantidad: '',
    NumeroArticulo: '',
    NombreArticulo: ''
  });
  const [detalleEditado, setDetalleEditado] = useState(null);

  useEffect(() => {
    fetchDetalles();
  }, []);

  const fetchDetalles = () => {
    buscarDetalle()
      .then((data) => setLista(data))
      .catch((error) => {
        console.log('Error al obtener la lista de detalles:', error);
      });
  };

  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const toggleModalEditar = (detalle) => {
    setDetalleEditado(detalle);
    setModalEditar(!modalEditar);
  };

  const handleInputChange = (e) => {
    setNuevoDetalle({
      ...nuevoDetalle,
      [e.target.name]: e.target.value
    });
  };

  const handleEditInputChange = (e) => {
    setDetalleEditado({
      ...detalleEditado,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    insertarDetalle(nuevoDetalle)
      .then(() => {
        fetchDetalles();
        setNuevoDetalle({
            NumeroDetalle: '',
            NumeroFactura: '',
            FechaEmision: '',
            Cantidad: '',
            NumeroArticulo: '',
            NombreArticulo: ''
        });
        setModalInsertar(false);
      })
      .catch((error) => {
        console.log('Error al insertar el detalle:', error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    actualizarDetalle(detalleEditado)
      .then(() => {
        fetchDetalles();
        setDetalleEditado(null);
        setModalEditar(false);
      })
      .catch((error) => {
        console.log('Error al actualizar el detalle:', error);
      });
  };

  const deleteDetalle = (id) => {
    eliminarDetalle(id)
      .then(() => {
        fetchDetalles();
      })
      .catch((error) => {
        console.log('Error al eliminar el detalle:', error);
      });
  };

  const onSubmit = (data) => {
    let { filtro } = data;
    console.log(filtro);
    if (filtro.trim() === '') {
      fetchDetalles(); // Obtener la lista completa si el filtro está vacío
    } else {
      buscarDetallePorNombre(filtro)
        .then((dataMod) => setLista(dataMod))
        .catch((error) => {
          console.log('Error al buscar el detalle por nombre:', error);
        });
    }
  };

  const resetForm = () => {
    reset(); // Limpiar el campo de entrada
    fetchDetalles(); // Cargar la lista completa
  };

  return (
    <div>
      <Container>
        <br />
        <FormularioDetalle onSubmit={onSubmit} resetForm={resetForm}></FormularioDetalle>
        <br />
        <Button color="success" onClick={toggleModalInsertar}>
          Insertar nuevo detalle
        </Button>
        <br />
        <br />
        <ListadoDetalle lista={lista} toggleModalEditar={toggleModalEditar} deleteDetalle={deleteDetalle}></ListadoDetalle>
      </Container>

      {/* Modal de inserción */}
      <Modal isOpen={modalInsertar} toggle={toggleModalInsertar}>
        <ModalHeader toggle={toggleModalInsertar}>Insertar nuevo detalle</ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <FormGroup>
              <label>Numero de detalle</label>
              <input
                type="text"
                name="NumeroDetalle"
                value={nuevoDetalle.NumeroDetalle}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Numero de factura</label>
              <input
                type="text"
                name="NumeroFactura"
                value={nuevoDetalle.NumeroFactura}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de emision</label>
              <input
                type="date"
                name="FechaEmision"
                value={nuevoDetalle.FechaEmision}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Cantidad</label>
              <input
                type="text"
                name="Cantidad"
                value={nuevoDetalle.Cantidad}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Numero de articulo</label>
              <input
                type="text"
                name="NumeroArticulo"
                value={nuevoDetalle.NumeroArticulo}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre de articulo</label>
              <input
                type="text"
                name="NombreArticulo"
                value={nuevoDetalle.NombreArticulo}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">
                Insertar
              </Button>{' '}
              <Button color="secondary" onClick={toggleModalInsertar}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      {/* Modal de edición */}
      <Modal isOpen={modalEditar} toggle={toggleModalEditar}>
        <ModalHeader toggle={toggleModalEditar}>Editar detalle</ModalHeader>
        {detalleEditado && (
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <FormGroup>
                <label>Numero de detalle</label>
                <input
                  type="text"
                  name="NumeroDetalle"
                  value={detalleEditado.NumeroDetalle}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Numero de factura</label>
                <input
                  type="text"
                  name="NumeroFactura"
                  value={detalleEditado.NumeroFactura}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Fecha de emision</label>
                <input
                  type="date"
                  name="FechaEmision"
                  value={detalleEditado.FechaEmision}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Cantidad</label>
                <input
                  type="text"
                  name="Cantidad"
                  value={detalleEditado.Cantidad}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Numero de articulo</label>
                <input
                  type="text"
                  name="NumeroArticulo"
                  value={detalleEditado.NumeroArticulo}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Nombre de articulo</label>
                <input
                  type="text"
                  name="NombreArticulo"
                  value={detalleEditado.NombreArticulo}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Actualizar
                </Button>{' '}
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

export { DetalleFacturas };
