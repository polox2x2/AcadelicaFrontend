import React, { useState, useEffect } from 'react';
import styles from './styles/MatematicaJuego.module.css';

const generarPregunta = () => {
  const a = Math.floor(Math.random() * 10 + 1);
  const b = Math.floor(Math.random() * 10 + 1);
  const operadores = ['+', '-', '*'];
  const operador = operadores[Math.floor(Math.random() * operadores.length)];

  let resultado;
  switch (operador) {
    case '+':
      resultado = a + b;
      break;
    case '-':
      resultado = a - b;
      break;
    case '*':
      resultado = a * b;
      break;
    default:
      resultado = 0;
  }

  return { pregunta: `${a} ${operador} ${b}`, respuesta: resultado };
};

const MatematicaJuego = () => {
  const [preguntaActual, setPreguntaActual] = useState(generarPregunta());
  const [input, setInput] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState('');

  const verificar = () => {
    if (parseInt(input) === preguntaActual.respuesta) {
      setPuntos((prev) => prev + 1);
      setFeedback('✅ ¡Correcto!');
    } else {
      setFeedback(`❌ Incorrecto. Respuesta correcta: ${preguntaActual.respuesta}`);
    }

    setTimeout(() => {
      setPreguntaActual(generarPregunta());
      setInput('');
      setFeedback('');
    }, 2000);
  };

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Juego de Matemática</h2>
      <p className={styles['question']}>{preguntaActual.pregunta}</p>

      <input
        type="number"
        className={styles['input']}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tu respuesta"
      />
      <button className={styles['submit']} onClick={verificar}>
        Verificar
      </button>

      {feedback && <p className={styles['feedback']}>{feedback}</p>}
      <p className={styles['score']}>Puntaje: {puntos}</p>
    </div>
  );
};

export default MatematicaJuego;
