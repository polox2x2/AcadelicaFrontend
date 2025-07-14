import React, { useState } from 'react';
import "./style/register.css"
import logoMini from "../../assets/Logo-Acdélicamini.png"
import axios from 'axios';
function Register() {

    const [datos,setDatos]=useState({
      nombre:"",
      apellido:"",
      correo:"",
      clave:""
    });

    const handleInputChange = (e) =>{
    const{name,value}=e.target;
    setDatos({
      ...datos,
      [name]:value
    })
  };

    const enviarRegistro = async (e) => {
        e.preventDefault ();

        try{
          console.log("Datos enviados:", datos);
          const respuesta = await axios.post('http://localhost:8080/api/alumno/crear', {
            nombre:datos.nombre,
            apellido:datos.apellido,
            correo:datos.correo,
            clave:datos.clave
          });
            alert('registrado con exito');
            if (respuesta.status === 200){
              alert("Registro Exitoso");
              window.location.href = '/login';
            }
        }catch (e){
            alert("Fallo en el Registro, Intente Nuevamente")
            console.error("Error em el registro",e.response || e);
        }
        
    };
   

    return (
       <div className="register-container">
      <div className="register-box">
        <img src={logoMini} alt="Logo Acadélica" className="register-logo" />
        <h2 className="register-title">Registro de Usuario</h2>

        <form onSubmit={enviarRegistro}>
          <label htmlFor="nombres">Nombres</label>
          <input type="text" id="nombre" name='nombre' value={datos.nombre}  onChange={handleInputChange} placeholder="Ingresa Tu Nombre" />

          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" id="apellido" name='apellido' value={datos.apellido} onChange={handleInputChange} placeholder="Ingresa Tu Apellido" />

          <label htmlFor="correo">Correo</label>
          <input type="email" id="correo" name='correo' value={datos.correo} onChange={handleInputChange} placeholder="Ingresa Tu Correo" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="clave" name='clave' value={datos.clave} onChange={handleInputChange} placeholder="Ingresa Tu Contraseña" />

          <button type="submit" className="register-button" >Continuar al Pago</button>
        </form>

        <p className="note">Tu cuenta se activará después del pago exitoso.</p>
      </div>
    </div>
    );
}

export default Register;