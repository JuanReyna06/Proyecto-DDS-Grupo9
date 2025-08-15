import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormGroup, Label } from 'reactstrap';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function FormularioDetalle({onSubmit, resetForm}){
    const { register, handleSubmit, reset } = useForm();
    
    const handleFormSubmit = (data) => {
        onSubmit(data);
      };
    
      const handleResetForm = () => {
        reset()
        resetForm();
      };
    return(
        <FormGroup>
        <h3>Formulario de Búsqueda</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-3">
              <Label className="form-label">Numero detalle:</Label>
              <input type="text" style={{ textTransform: 'none' }} placeholder='Indica del numero de detalle para filtrar...' className="form-control" {...register('filtro')} />
            </div>
            <div>
              <Button type="submit" className="btn btn-primary" color='primary'>Buscar</Button>
              <> </>
              <Button type="button" className="btn btn-secondary" onClick={handleResetForm}>Resetear</Button>
            </div>
          </form>
        </div>  
        </FormGroup>
    )

}
export {FormularioDetalle}