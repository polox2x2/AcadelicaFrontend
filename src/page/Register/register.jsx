// Register.jsx
import React, { useState } from 'react';
import "./style/register.css";
import logoMini from "../../assets/Logo-Acdélicamini.png";
import axios from 'axios';

function Register() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    clave: ""
  });
  const [confirmarClave, setConfirmarClave] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const registrarSinPago = async (e) => {
    e.preventDefault();
    if (datos.clave !== confirmarClave) return alert("Las contraseñas no coinciden");

    try {
      const respuesta = await axios.post('http://localhost:8080/api/alumno/crear', datos);
      if (respuesta.status === 200) {
        alert("Registro exitoso sin pago (modo desarrollo)");
        window.location.href = '/login';
      }
    } catch (e) {
      alert("Error al registrar sin pago");
      console.error(e);
    }
  };

  const enviarRegistroConPago = async (e) => {
    e.preventDefault();
    if (datos.clave !== confirmarClave) return alert("Las contraseñas no coinciden");

    try {
      localStorage.setItem("registroAlumno", JSON.stringify(datos));

      const response = await axios.post("http://localhost:8080/api/pago/paypal", {
        correo: datos.correo,
        nombre: datos.nombre,
        apellido: datos.apellido
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("No se obtuvo un enlace válido de PayPal.");
      }
    } catch (error) {
      console.error("Error al iniciar pago con PayPal:", error);
      alert("No se pudo iniciar el pago. Intenta nuevamente.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logoMini} alt="Logo Acadélica" className="register-logo" />
        <h2 className="register-title">Registro de Usuario</h2>

        <form>
          <label>Nombres</label>
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleInputChange}
            placeholder="Tu Nombre"
            required
          />

          <label>Apellidos</label>
          <input
            type="text"
            name="apellido"
            value={datos.apellido}
            onChange={handleInputChange}
            placeholder="Tu Apellido"
            required
          />

          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={handleInputChange}
            placeholder="Tu Correo"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="clave"
            value={datos.clave}
            onChange={handleInputChange}
            placeholder="Tu Contraseña"
            required
          />

          <label>Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmarClave}
            onChange={(e) => setConfirmarClave(e.target.value)}
            placeholder="Repite tu contraseña"
            required
          />

          <button className="register-button" onClick={enviarRegistroConPago}>
            Pagar con PayPal
          </button>

          <button
            className="register-button"
            onClick={registrarSinPago}
            style={{ backgroundColor: '#ccc', marginTop: '10px' }}
          >
            Registrar sin pagar (modo dev)
          </button>
        </form>

        <p className="note">Tu cuenta se activará después del pago exitoso.</p>
      </div>
    </div>
  );
}

export default Register;
