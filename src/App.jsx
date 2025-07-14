import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Login from "./page/Login/login";
import "/src/app.css"
import Register from "./page/Register/register";
import MainLayout from "./layout/MainLayout";
import Horario from "./page/Horario/Horario";
import Principal from "./page/Principal/principal";
import SchoolAdminCRUD from "./page/SchoolAdminCRUD/SchoolAdminCRUD";
function App() {
 
  return (
    
    <BrowserRouter>
     
      <Routes>

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas/anidadas dentro del layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Principal />} /> {/* Muestra Principal en / */}
          <Route path="principal" element={<Principal />} />
          <Route path="horario" element={<Horario />} />
      

        </Route>

      {/* Administrador  */}
      <Route path="admin" element={<SchoolAdminCRUD />} />
      
      
      </Routes> 
  
    </BrowserRouter>

  )


}
export default App;
