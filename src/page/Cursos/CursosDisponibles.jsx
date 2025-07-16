import React, { useEffect, useState } from 'react';
import styles from './style/cursosDisponibles.module.css';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';

const CursosDisponibles = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [alumnoId, setAlumnoId] = useState(null);
  const correo = localStorage.getItem("correoAlumno");

  useEffect(() => {
    if (!correo) {
      navigate("/login");
      return;
    }

    const fetchAlumno = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/alumno/obtenerCorreo?correo=${encodeURIComponent(correo)}`);
        setAlumnoId(res.data.id);
      } catch (error) {
        console.error("Error al obtener el alumno:", error);
        navigate("/login");
      }
    };

    fetchAlumno();
  }, [correo, navigate]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/curso/obtener")
      .then(res => setCursos(res.data))
      .catch(err => console.error("Error al cargar cursos:", err));
  }, []);

  const handleInscribirse = async (cursoId) => {
    if (!alumnoId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/alumno/${alumnoId}/agregar-curso/${cursoId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("¡Te has inscrito correctamente en el curso!");
    } catch (error) {
      console.error("Error al inscribirse:", error);
      alert("No se pudo inscribirte. Verifica si ya estás inscrito o vuelve a intentarlo.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cursos Disponibles</h2>

      {cursos.length > 0 ? (
        <div className={styles.grid}>
          {cursos.map((curso) => (
            <div className={styles.card} key={curso.id}>
              <h3>{curso.nombre}</h3>
              <p><strong>Categoría:</strong> {curso.categoriaDTO?.nombre || 'General'}</p>
              <p><strong>Descripción:</strong> {curso.descripcion}</p>
              <p><strong>Duración:</strong> {curso.duracion} horas</p>

              {curso.horariosDTO?.length > 0 && (
                <div className={styles.horarios}>
                  <strong>Horarios:</strong>
                  <ul>
                    {curso.horariosDTO
                      .filter(h => h.horaInicio && h.horaFin)
                      .map((horario, index) => (
                        <li key={index}>
                          {horario.horario}: {horario.horaInicio} - {horario.horaFin}
                        </li>
                    ))}
                  </ul>
                </div>
              )}

              <button onClick={() => handleInscribirse(curso.id)} className={styles.btn}>
                Inscribirme
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No hay cursos disponibles por ahora.</p>
      )}
    </div>
  );
};

export default CursosDisponibles;
