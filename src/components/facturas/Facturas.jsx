import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import { buscarFactura,actualizarFactura,eliminarFactura,insertarFactura,buscarFacturaPorTipo } from '../../services/facturas.service';
import { FormularioFacturas } from './FormularioFacturas';
import { ListaFactruras } from './ListadoFacturas';

function Factura() {
  const {  reset } = useForm();
  const [lista, setLista] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [nuevaFactura, setNuevaFactura] = useState({
    IdFactura: '',
    FechaEmision: '',
    Cliente: '',
    Tipo: '',
    Detalle: ''
  });
  const [facturaEditada, setFacturaEditada] = useState(null);

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = () => {
    buscarFactura()
      .then((data) => setLista(data))
      .catch((error) => {
        console.log('Error al obtener la lista de Facturas', error);
      });
  };

  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const toggleModalEditar = (factura) => {
    setFacturaEditada({ ...factura }); 
    setModalEditar(!modalEditar);
  };
  

  const handleInputChange = (e) => {
    setNuevaFactura({
      ...nuevaFactura,
      [e.target.name]: e.target.value
    });
  };

  const handleEditInputChange = (e) => {
    setFacturaEditada({
        ...facturaEditada,
        [e.target.name]: e.target.value
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    insertarFactura(nuevaFactura)
      .then(() => {
        fetchFacturas();
        setNuevaFactura({
            IdFactura: '',
            FechaEmision: '',
            Cliente: '',
            Tipo: '',
            Detalle: ''
        });
        setModalInsertar(false);
      })
      .catch((error) => {
        console.log('Error al insertar la factura:', error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    actualizarFactura(facturaEditada)
      .then(() => {
        fetchFacturas();
        setFacturaEditada(null);
        setModalEditar(false);
      })
      .catch((error) => {
        console.log('Error al actualizar la Factura:', error);
      });
  };

  const deleteFactura = (id) => {
    eliminarFactura(id)
      .then(() => {
        fetchFacturas();
      })
      .catch((error) => {
        console.log('Error al eliminar la Factura:', error);
      });
  };

  const onSubmit = (data) => {
    let { filtro } = data;
    console.log(filtro);
    if (filtro === '') {
      fetchFacturas(); // Obtener la lista completa si el filtro está vacío
    } else {
      buscarFacturaPorTipo(filtro)
        .then((dataMod) => setLista(dataMod))
        .catch((error) => {
          console.log('Error al buscar la factura por Tipo:', error);
        });
    }
  };

  const resetForm = () => {
    reset(); 
    fetchFacturas(); 
  };

  return (
    <div>
      <Container>
        <br />
        <FormularioFacturas onSubmit={onSubmit} resetForm={resetForm}></FormularioFacturas>
        <br />
        <Button color="success" onClick={toggleModalInsertar}>
          Insertar nueva factura
        </Button>
        <br />
        <br />
        <ListaFactruras lista={lista} toggleModalEditar={toggleModalEditar} deleteFactura={deleteFactura}></ListaFactruras>
      </Container>

      {/* Modal de inserción */}
      <Modal isOpen={modalInsertar} toggle={toggleModalInsertar}>
        <ModalHeader toggle={toggleModalInsertar}>Insertar nueva Factura</ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <FormGroup>
              <label>ID de la Factura</label>
              <input
                type="text"
                name="IdFactura"
                value={nuevaFactura.IdFactura}
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
                value={nuevaFactura.FechaEmision}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>ID Cliente</label>
              <input
                type="text"
                name="Cliente"
                value={nuevaFactura.Cliente}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Tipo</label>
              <input
                type="text"
                name="Tipo"
                value={nuevaFactura.Tipo}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>ID Detalle</label>
              <input
                type="text"
                name="Detalle"
                value={nuevaFactura.Detalle}
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
        <ModalHeader toggle={toggleModalEditar}>Editar Factura</ModalHeader>
        {facturaEditada && (
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
            <FormGroup>
              <label>Fecha de emision</label>
              <input
                type="date"
                name="FechaEmision"
                value={facturaEditada.FechaEmision}
                onChange={handleEditInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>ID Cliente</label>
              <input
                type="text"
                name="Cliente"
                value={facturaEditada.Cliente}
                onChange={handleEditInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Tipo</label>
              <input
                type="text"
                name="Tipo"
                value={facturaEditada.Tipo}
                onChange={handleEditInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>ID Detalle</label>
              <input
                type="text"
                name="Detalle"
                value={facturaEditada.Detalle}
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

export { Factura };
