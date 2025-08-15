import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { buscarArticulo, insertarArticulo, eliminarArticulo, actualizarArticulo, buscarArticuloPorNombre } from '../../services/articulos.service';
import { ListadoArticulos } from './ListadoArticulos';
import { FormularioArticulos } from './FormularioArticulos';

function Articulo() {
  const { reset } = useForm();
  const [lista, setLista] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [nuevoArticulo, setNuevoArticulo] = useState({
    IdArticulo: '',
    Nombre: '',
    FechaAlta: '',
    Stock: ''
  });
  const [articuloEditado, setArticuloEditado] = useState(null);

  useEffect(() => {
    fetchArticulos();
  }, []);

  const fetchArticulos = () => {
    buscarArticulo()
      .then((data) => setLista(data))
      .catch((error) => {
        console.log('Error al obtener la lista de artículos:', error);
      });
  };

  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const toggleModalEditar = (articulo) => {
    setArticuloEditado(articulo);
    setModalEditar(!modalEditar);
  };

  const handleInputChange = (e) => {
    setNuevoArticulo({
      ...nuevoArticulo,
      [e.target.name]: e.target.value
    });
  };

  const handleEditInputChange = (e) => {
    setArticuloEditado({
      ...articuloEditado,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    insertarArticulo(nuevoArticulo)
      .then(() => {
        fetchArticulos();
        setNuevoArticulo({
          IdArticulo: '',
          Nombre: '',
          FechaAlta: '',
          Stock: ''
        });
        setModalInsertar(false);
      })
      .catch((error) => {
        console.log('Error al insertar el artículo:', error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    actualizarArticulo(articuloEditado)
      .then(() => {
        fetchArticulos();
        setArticuloEditado(null);
        setModalEditar(false);
      })
      .catch((error) => {
        console.log('Error al actualizar el artículo:', error);
      });
  };

  const deleteArticulo = (id) => {
    eliminarArticulo(id)
      .then(() => {
        fetchArticulos();
      })
      .catch((error) => {
        console.log('Error al eliminar el artículo:', error);
      });
  };

  const onSubmit = (data) => {
    let { filtro } = data;
    console.log(filtro);
    if (filtro.trim() === '') {
      fetchArticulos(); // Obtener la lista completa si el filtro está vacío
    } else {
      buscarArticuloPorNombre(filtro)
        .then((dataMod) => setLista(dataMod))
        .catch((error) => {
          console.log('Error al buscar el artículo por nombre:', error);
        });
    }
  };

  const resetForm = () => {
    reset(); // Limpiar el campo de entrada
    fetchArticulos(); // Cargar la lista completa
  };

  return (
    <div>
      <Container>
        <br />
        <FormularioArticulos onSubmit={onSubmit} resetForm={resetForm}></FormularioArticulos>
        <br />
        <Button color="success" onClick={toggleModalInsertar}>
          Insertar nuevo artículo
        </Button>
        <br />
        <br />
       <ListadoArticulos lista={lista} toggleModalEditar={toggleModalEditar} deleteArticulo={deleteArticulo}></ListadoArticulos>
      </Container>

      {/* Modal de inserción */}
      <Modal isOpen={modalInsertar} toggle={toggleModalInsertar}>
        <ModalHeader toggle={toggleModalInsertar}>Insertar nuevo artículo</ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <FormGroup>
              <label>ID del Artículo</label>
              <input
                type="text"
                name="IdArticulo"
                value={nuevoArticulo.IdArticulo}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre del Artículo</label>
              <input
                type="text"
                name="Nombre"
                value={nuevoArticulo.Nombre}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de Alta</label>
              <input
                type="date"
                name="FechaAlta"
                value={nuevoArticulo.FechaAlta}
                onChange={handleInputChange}
                className="form-control"
                style={{ textTransform: 'none' }}
              />
            </FormGroup>
            <FormGroup>
              <label>Stock</label>
              <input
                type="text"
                name="Stock"
                value={nuevoArticulo.Stock}
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
        <ModalHeader toggle={toggleModalEditar}>Editar artículo</ModalHeader>
        {articuloEditado && (
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <FormGroup>
                <label>ID del Artículo</label>
                <input
                  type="text"
                  name="IdArticulo"
                  value={articuloEditado.IdArticulo}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Nombre del Artículo</label>
                <input
                  type="text"
                  name="Nombre"
                  value={articuloEditado.Nombre}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Fecha de Alta</label>
                <input
                  type="date"
                  name="FechaAlta"
                  value={articuloEditado.FechaAlta}
                  onChange={handleEditInputChange}
                  className="form-control"
                  style={{ textTransform: 'none' }}
                />
              </FormGroup>
              <FormGroup>
                <label>Stock</label>
                <input
                  type="text"
                  name="Stock"
                  value={articuloEditado.Stock}
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

export { Articulo };
