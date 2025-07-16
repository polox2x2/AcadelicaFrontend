import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./style/DetalleCurso.module.css";

const DetalleCurso = () => {
  const { nombre } = useParams();
  const [curso, setCurso] = useState(null);
  const navigate = useNavigate();
  const correo = localStorage.getItem("correoAlumno");

  useEffect(() => {
    if (!correo) {
      navigate("/login");
      return;
    }

    const fetchCursos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/curso/obtener");
        const cursosAlumno = res.data.filter((c) =>
          c.alumnos?.some((a) => a.correo === correo)
        );

        const cursoSeleccionado = cursosAlumno.find(
          (c) => c.nombre === decodeURIComponent(nombre)
        );
        setCurso(cursoSeleccionado || null);
      } catch (err) {
        console.error("Error al obtener los cursos:", err);
      }
    };

    fetchCursos();
  }, [nombre, correo, navigate]);

  if (!curso) return <div className={styles.loading}>Cargando curso...</div>;

  return (
    <div className={styles.container}>
      <h2>{curso.nombre || "Curso sin título"}</h2>
      <p><strong>Categoría:</strong> {curso.categoriaDTO?.nombre || "Sin categoría"}</p>
      <p><strong>Descripción:</strong> {curso.descripcion || "No hay descripción disponible."}</p>

      <div className={styles.sesiones}>
        <h3>Sesiones y Actividades</h3>
        <div className={styles.accordion}>
          {curso.actividad?.length === 0 ? (
            <p>No hay actividades disponibles.</p>
          ) : (
            curso.actividad?.map((actividad, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.title}>
                  <span>⭐</span> {actividad.titulo || "Actividad sin título"}
                </div>
                <div className={styles.description}>
                  {actividad.descripcion || "Sin descripción"}
                </div>
                <div className={styles.estado}>0 A</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.horarios}>
        <h3>Horarios</h3>
        {curso.horariosDTO?.length > 0 ? (
          curso.horariosDTO.map((h, i) => (
            <div key={i} className={styles.horarioItem}>
              📅 {h.horario || "Día no especificado"} — 🕒 {h.horaInicio ?? '—'} a {h.horaFin ?? '—'}
            </div>
          ))
        ) : (
          <p>No hay horarios asignados.</p>
        )}
      </div>
    </div>
  );
};

export default DetalleCurso;
