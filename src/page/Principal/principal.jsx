import React, { useEffect, useState } from 'react';
import styles from './style/principal.module.css'
import CourseCard from '../../component/CourseCard/CourseCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../../component/AgenteChat/Chatbot';

const Principal = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [alumno, setAlumno]= useState(null);

  
  const correo = localStorage.getItem("correoAlumno");
  useEffect(() => {
  
  if (!correo) {
    navigate("/login");
    return;
  }

  const fetchAlumno = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/alumno/obtenerCorreo?correo=${encodeURIComponent(correo)}`
      );
      setAlumno(res.data);
    } catch (e) {
      console.error("Error al obtener Alumno", e);
      localStorage.removeItem("correoAlumno");
      navigate("/login");
    }
  };

  fetchAlumno();
}, [navigate]);

useEffect(() => {
  

  axios.get(`http://localhost:8080/api/curso/obtener-por-correo?correo=${encodeURIComponent(correo)}`)
    .then(res => setCursos(res.data))
    .catch(err => console.error('Error al cargar cursos:', err));
}, []);



  return (
   <div className={styles['principal-wrapper']}>
    <div className={styles['date-info']}>
      Fecha: {new Date().toLocaleDateString()}
    </div>

    <div className={styles['course-grid']}>
      {cursos.length > 0 ? (
        cursos.map((curso, index) => (
          <CourseCard
            key={index}
            icon="📘"
            titulo={curso.nombre}
            docente={curso.profesorID?.nombre || 'Desconocido'}
          />
        ))
      ) : (
        <p className={styles['no-courses-message']}>
          No hay cursos disponibles para mostra :D
        </p>
      )}
    </div>
    
    

  </div>

  );
};

export default Principal;