import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Login from "./page/Login/login";
import "/src/app.css"
import Register from "./page/Register/register";
import MainLayout from "./layout/MainLayout";
import Horario from "./page/Horario/Horario";
import Principal from "./page/Principal/principal";
import SchoolAdminCRUD from "./page/SchoolAdminCRUD/SchoolAdminCRUD";
import Mensajes from "./page/MessageInterface/Mensajes";
import GameMenu from "./page/Games/GameMenu";
import TriviaHistoria from "./component/GameComponent/TriviaHistoria";
import ProblemasFisica from "./component/GameComponent/ProblemasFisica";
import MatematicaJuego from "./component/GameComponent/MatematicaJuego";
import CursosDisponibles from "./page/Cursos/CursosDisponibles";
import DetalleCurso from "./page/Cursos/DetalleCurso";
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
          <Route path="cursos" element={<CursosDisponibles />} />
          <Route path="mensajes" element ={<Mensajes/>} />
          <Route path="/curso/:nombre" element={<DetalleCurso />} />


          {/* Rutas para los juegos */}
          <Route path="games" element ={<GameMenu/>} />
          <Route path="juegos/trivia-historia" element={<TriviaHistoria />} />
          <Route path="juegos/problemas-fisica" element={<ProblemasFisica />} />
          <Route path="juegos/matematica" element={<MatematicaJuego />} />  

        </Route>

      {/* Administrador  */}
      <Route path="admin" element={<SchoolAdminCRUD />} />
      
      
      </Routes> 
  
    </BrowserRouter>

  )


}
export default App;
