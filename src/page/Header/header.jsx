import React, { useState,useEffect } from 'react';
import styles from './style/header.module.css'; // Asegúrate de que la ruta esté correcta
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logoMini from "../../assets/Logo-Acdélicamini.png" ;


const Header = ({ toggleSidebar }) => {



  const [alumnoData,setAlumnoData]= useState(null);
  const navigate = useNavigate();

  const handleLogout = ()=>{
      localStorage.removeItem("correoAlumno");
      setAlumnoData(null);
      navigate("/login");

  };
  const correo = localStorage.getItem("correoAlumno");
    useEffect(() => {
     const handleStorageChange = () => {
    if (correo) {
      axios.get(`http://localhost:8080/api/alumno/obtenerCorreo?correo=${encodeURIComponent(correo)}`)
        .then(res => setAlumnoData(res.data))
        .catch(err => console.error("Error al obtener alumno:", err));
    }
  };

  window.addEventListener("storage", handleStorageChange);
  handleStorageChange(); 

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

   
  

  return (
    <div className={styles.header}>
      <div className={styles['logo-section']}>
        <button className={styles['menu-toggle']} onClick={toggleSidebar}>☰</button>
        <div className={styles.logo}><img className={styles.logoImg} src={logoMini}/></div>
        <div className={styles['logo-text']}>ACADEMIA</div>
      </div>
      <div className={styles['user-section']}>
        <button onClick={handleLogout} >
        Cerrar Sesión
      </button>
        <div className={styles['user-avatar']}>👤</div>
        <div className={styles['user-info']}>{alumnoData ? `Hola, ${alumnoData.nombre}` : 'Cargando nombre...'}</div>
      </div>
    </div>
  );
};

export default Header;