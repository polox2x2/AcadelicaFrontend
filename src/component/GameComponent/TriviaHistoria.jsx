import React, { useState ,useEffect } from 'react';
import styles from './styles/Trivia.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categorias = [
  { id: 23, nombre: 'Historia' },
  { id: 25, nombre: 'Arte' },
  { id: 9, nombre: 'Conocimiento General' },
  { id: 17, nombre: 'Ciencia y Naturaleza' },
];


const TriviaNivelado = () => {
  const [nivel, setNivel] = useState(1);
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  
  const obtenerPreguntas = async (categoriaId) => {
    setCargando(true);
    try {
      const dificultad = nivel === 1 ? 'easy' : nivel === 2 ? 'medium' : 'hard';
      const res = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${categoriaId}&difficulty=${dificultad}&type=multiple`
      );

      const formateadas = res.data.results.map((p) => {
        const opciones = [...p.incorrect_answers];
        const correcta = p.correct_answer;
        const posicion = Math.floor(Math.random() * 4);
        opciones.splice(posicion, 0, correcta);
        return {
          pregunta: p.question,
          opciones,
          correcta,
        };
      });

      setPreguntas(formateadas);
      setIndice(0);
      setRespuestasCorrectas(0);
      setMostrarResultado(false);
    } catch (err) {
      console.error('Error al obtener preguntas:', err);
    } finally {
      setCargando(false);
    }
  };

  const manejarRespuesta = (respuesta) => {
    if (!preguntas[indice]) return;

    if (respuesta === preguntas[indice].correcta) {
      setRespuestasCorrectas((prev) => prev + 1);
    }

    if (indice + 1 < preguntas.length) {
      setIndice((prev) => prev + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  const siguienteNivel = () => {
    if (respuestasCorrectas >= 4 && nivel < 3) {
      setNivel(nivel + 1);
    } else {
      setNivel(1);
    }
    obtenerPreguntas(categoriaSeleccionada);
  };

  const seleccionarCategoria = (id) => {
    setCategoriaSeleccionada(id);
    setNivel(1);
    obtenerPreguntas(id);
  };
  const volverAlMenu = () => {
  navigate('/games');
};

  return (
    
    <div className={styles['trivia-container']}>
        <button className={styles['volver-btn']} onClick={volverAlMenu}>
      🔙 Volver al menú
    </button>
      <h2 className={styles['titulo']}>🧠 Trivia por Niveles</h2>

      {!categoriaSeleccionada ? (
        <div className={styles['seleccion-categoria']}>
          <h3>Selecciona una categoría:</h3>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={styles['categoria-btn']}
              onClick={() => seleccionarCategoria(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      ) : cargando ? (
        <div className={styles['cargando']}>⏳ Cargando preguntas...</div>
      ) : !mostrarResultado ? (
        preguntas.length > 0 && preguntas[indice] ? (
          <div className={styles['pregunta-box']}>
            <h4 className={styles['nivel']}>Nivel: {nivel}</h4>
            <h3
              className={styles['pregunta-text']}
              dangerouslySetInnerHTML={{ __html: preguntas[indice].pregunta }}
            />
            <div className={styles['opciones']}>
              {preguntas[indice].opciones.map((op, i) => (
                <button
                  key={i}
                  className={styles['opcion-btn']}
                  onClick={() => manejarRespuesta(op)}
                  dangerouslySetInnerHTML={{ __html: op }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className={styles['pregunta-text']}>Cargando preguntas...</p>
        )
      ) : (
        <div className={styles['resultado']}>
          <h3>✅ Respondiste correctamente {respuestasCorrectas} de 5</h3>
          {respuestasCorrectas >= 4 ? (
            <button className={styles['siguiente-nivel-btn']} onClick={siguienteNivel}>
              🚀 ¡Siguiente Nivel!
            </button>
          ) : (
            <button className={styles['reiniciar-btn']} onClick={siguienteNivel}>
              🔁 Reiniciar desde Nivel 1
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TriviaNivelado;