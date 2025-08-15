  import "./App.css";
  import React from "react";
  import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
  import Menu from "./components/Menu";
  import { Footer } from "./components/Footer";
  import { Inicio } from "./components/Inicio";
  import { DetalleFacturas } from "./components/detalleFacturas/DetalleFacturas";
  import { Articulo } from "./components/articulos/Articulos"
  import { Factura } from "./components/facturas/Facturas";
  import { Cliente } from "./components/clientes/Clientes";

  function App() {
    

    return (
      <>
        
          <BrowserRouter>
            
            <Menu />
            <div className="divBody">
              <Routes>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/articulos" element={<Articulo />} />
                <Route path="/detalles" element={<DetalleFacturas/>} />
                <Route path="/facturas" element={<Factura/>} />
                <Route path="/clientes" element={<Cliente/>} />
                <Route path="*" element={<Navigate to="/inicio" replace />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
      </>
    );
  }

  export default App;
