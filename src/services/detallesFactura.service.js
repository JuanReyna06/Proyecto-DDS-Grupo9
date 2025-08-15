import axios from 'axios';

const urlResource = 'http://localhost:3001/api/detalleFacturas';

const buscarDetalle = () => {
  return axios.get(urlResource)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // El servidor respondió con un código de error
        console.log('Error de respuesta del servidor:', error.response.status, error.response.statusText);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió ninguna respuesta
        console.log('No se recibió respuesta del servidor');
      } else {
        // Ocurrió un error durante la configuración de la solicitud
        console.log('Error al realizar la solicitud:', error.message);
      }
      // Rechazar la promesa con el error para que pueda ser manejado en el componente
      throw error;
    });
};

const insertarDetalle = (nuevoDetalle) => {
  return axios.post(urlResource, nuevoDetalle)
    .then((response) => {
      console.log('Detalle insertado con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al insertar el detalle:', error);
      throw error;
    });
};

const eliminarDetalle = (NumeroDetalle) => {
  const url = `${urlResource}/${NumeroDetalle}`;
  return axios.delete(url)
    .then((response) => {
      console.log('Detalle eliminado con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al eliminar el detalle:', error);
      throw error;
    });
};

const actualizarDetalle = (detalleEditado) => {
  const { NumeroDetalle, NumeroFactura, FechaEmision, Cantidad, NumeroArticulo, NombreArticulo } = detalleEditado;
  const updatedDetalle = {
    NumeroDetalle,
    NumeroFactura,
    FechaEmision,
    Cantidad,
    NumeroArticulo,
    NombreArticulo
  };

  const url = `${urlResource}/${detalleEditado.NumeroDetalle}`;
  return axios.put(url, updatedDetalle)
    .then((response) => {
      console.log('Detalle actualizado con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al actualizar el detalle:', error);
      throw error;
    });
};

const buscarDetallePorNombre = (filtro) => {
  const url = `http://localhost:3001/api/detalleFacturas?filtro=${filtro}`
  return (
      axios.get(url)
      .then((response) => {
      console.log(response.data)
      const data = response.data
      return data
      })
  )
}


export { buscarDetalle, insertarDetalle, eliminarDetalle, actualizarDetalle, buscarDetallePorNombre };
