import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function FormularioClientes({ handleFiltroChange }) {
  
  const handleFormChange = (e) => {
    
    handleFiltroChange(e);
  };

  return (
    <div className="container">
      <h1>Filtrar Clientes Por Nombre</h1>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input type="text" className="form-control" onChange={handleFormChange} />
          </div>
        </form>
      </div>
    </div>
  );
}

export {FormularioClientes};
