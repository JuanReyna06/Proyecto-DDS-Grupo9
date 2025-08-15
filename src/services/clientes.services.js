import axios from 'axios';

const urlResource = 'http://localhost:3001/api/clientes';



const buscarCliente = async (filtro) => {;
    const url = `${urlResource}?filtro=${filtro}`;
    return await axios.get(url)
        .then((response) => {
            console.log(filtro)
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

const insertarCliente = async (newClient) => {
    return await axios.post(urlResource, newClient)
        .then((response) => {
            console.log('Cliente insertado con éxito');
            return response.data;
        })
        .catch((error) => {
            console.log('Error al insertar el cliente:', error);
            throw error;
        });
};

const eliminarCliente = async (idCliente) => {
    const url = `${urlResource}/delete/${idCliente}`;
    return await axios.delete(url)
        .then((response) => {
            console.log('Cliente eliminado con éxito');
            return response.data;
        })
        .catch((error) => {
            console.log('Error al eliminar el cliente:', error);
            throw error;
        });
};

const actualizarCliente = async (clienteModif) => {
    const { idCliente, nombre, fechaNac, telefono } = clienteModif;
    const uptdCliente = {
        idCliente,
        nombre,
        fechaNac,
        telefono
    };

    return await axios.put(urlResource, uptdCliente)
        .then((response) => {
            console.log('Cliente actualizado con éxito');
            return response.data;
        })
        .catch((error) => {
            console.log('Error al actualizar el Cliente:', error);
            throw error;
        });
};



export { buscarCliente, insertarCliente, eliminarCliente, actualizarCliente};