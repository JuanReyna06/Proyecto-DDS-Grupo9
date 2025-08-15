import axios from 'axios';

const urlResource = 'http://localhost:3001/api/articulos';

const buscarArticulo = () => {
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

const insertarArticulo = (nuevoArticulo) => {
  return axios.post(urlResource, nuevoArticulo)
    .then((response) => {
      console.log('Artículo insertado con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al insertar el artículo:', error);
      throw error;
    });
};

const eliminarArticulo = (idArticulo) => {
  const url = `${urlResource}/${idArticulo}`;
  return axios.delete(url)
    .then((response) => {
      console.log('Artículo eliminado con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al eliminar el artículo:', error);
      throw error;
    });
};

const actualizarArticulo = (articuloEditado) => {
  const { IdArticulo, Nombre, FechaAlta, Stock } = articuloEditado;
  const updatedArticulo = {
    IdArticulo,
    Nombre,
    FechaAlta,
    Stock
  };

  const url = `${urlResource}/${articuloEditado.IdArticulo}`;
  return axios.put(url, updatedArticulo)
    .then((response) => {
      console.log('Artículo actualizado con éxito');
      return response.data;
    })
    .catch((error) => {
      console.log('Error al actualizar el artículo:', error);
      throw error;
    });
};

const buscarArticuloPorNombre = (filtro) => {
  const url = `http://localhost:3001/api/articulos?filtro=${filtro}`
  return (
      axios.get(url)
      .then((response) => {
      console.log(response.data)
      const data = response.data
      return data
      })
  )
}


export { buscarArticulo, insertarArticulo, eliminarArticulo, actualizarArticulo, buscarArticuloPorNombre };
