import axios from 'axios';

const urlResource = 'http://localhost:3001/api/facturas';

const buscarFactura = () => {
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

const insertarFactura = (nuevaFactura) => {
  return axios.post(urlResource, nuevaFactura)
    .then((response) => {
      console.log('Facura creada con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al crear la factura:', error);
      throw error;
    });
};

const eliminarFactura = (idFactura) => {
  const url = `${urlResource}/${idFactura}`;
  return axios.delete(url)
    .then((response) => {
      console.log('Factura eliminada con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al eliminar la Factura:', error);
      throw error;
    });
};

const actualizarFactura = (facturaActualizada) => {
  const { IdFactura,FechaEmision,Cliente,Tipo,Detalle } = facturaActualizada;
  const updatedArticulo = {
    IdFactura,
    FechaEmision,
    Cliente,
    Tipo,
    Detalle
  };

  const url = `${urlResource}/${facturaActualizada.IdFactura}`;
  return axios.put(url, updatedArticulo)
    .then((response) => {
      console.log('Factura actualizada con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al actualizar la Factura:', error);
      throw error;
    });
};

const buscarFacturaPorTipo = (tipo) => {
  const url = `http://localhost:3001/api/facturas/${tipo}`
  return (
      axios.get(url)
      .then((response) => {
      console.log(response.data)
      const data = response.data
      return data
      })
  )
}


export { buscarFactura,insertarFactura,eliminarFactura,actualizarFactura,buscarFacturaPorTipo };
