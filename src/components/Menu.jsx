
import { NavLink} from "react-router-dom";


function Menu() {

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className="fa fa-industry"></i>
          &nbsp;<i>GRUPO-9-3K2</i>
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/detalles">
                Detalles de factura
              </NavLink>
            </li>   
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulos">
                Articulos
              </NavLink>
            </li>   
            <li className="nav-item">
              <NavLink className="nav-link" to="/facturas">
                Facturas
              </NavLink>
            </li>   
            <li className="nav-item">
              <NavLink className="nav-link" to="/clientes">
                Clientes
              </NavLink>
            </li>   
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
