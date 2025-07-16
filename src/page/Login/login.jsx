import React, { useEffect, useState } from 'react';
import "./style/login.css";
import logoMini from "../../assets/Logo-Acdélicamini.png";
import logo from '../../assets/Logo-Acdélica.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const[correo,setCorreo]=useState("");
  const[clave,setClave]=useState("");
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  useEffect (() =>{
    console.log("Correo en Header:", correo);
    if(localStorage.getItem("correoAlumno")){
      navigate("/principal");
    }
  },[navigate]);



  const handleLogin = async (e) =>{
    e.preventDefault();
    if(!correo.trim() || !clave.trim()){
        setError("Completa el Correo o la Clave");
        return;
    }
    try {
  setError(null);
  const response = await axios.post("http://localhost:8080/api/alumno/login", {
    correo,
    clave,
  });

  console.log("Login response:", response);

  localStorage.setItem("correoAlumno", correo);
  localStorage.setItem("token", response.data.token); 

    console.log("Token guardado:", response.data.token); 
  navigate("/principal");
} catch (e) {
  console.error("Login error:", e);
  setError("Credenciales incorrectas. Intentalo de nuevo.");
}

  };

 
   return (
    <div className="container">
      <div className="left-panel">
        <img src={logo} alt="Logo Acadélica" className="logo" />
        <h1>ACADÉLICA</h1>
      </div>
      <div className="right-panel">
        <div className="login-box">
          <img src={logoMini} alt="Mini Logo" className="mini-logo" />
          <h2>ACADÉLICA</h2>
          <p className="subtitle">
            Academia de Capacitación y Desarrollo Educativo,<br />
            <span>Líder en innovación, conocimiento y aprendizaje</span>
          </p>

          <form onSubmit={handleLogin} >
            <label htmlFor="email">Correo</label>
            <input
              type="email"

              id="correo"
              name='correo'
              placeholder="Ingresa Tu Correo"
              value={correo}
              onChange={(e)=>setCorreo(e.target.value)}
              required
            />
            <small>Ejemplo: Ejemplo_23.13@academica.edu.pe</small>

            <label htmlFor="clave">Contraseña</label>
            <input
              type="password"
              id="clave"
              name='clave'
              placeholder="Ingresa Tu Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
             {error && <div className="login-div-error">{error}</div>}
            <div className="buttons">
              <button className="btn"  type="submit" >Iniciar Sesión</button>
              <Link to="/register" className="btn secondary">Registrarse</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
