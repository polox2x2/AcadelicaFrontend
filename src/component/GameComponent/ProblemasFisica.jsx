import React, { useState } from 'react';
import styles from './styles/Fisica.module.css';

const problemas = [
  {
    pregunta: '¿Cuál es la fórmula de la velocidad?',
    opciones: ['v = d / t', 'v = m / a', 'v = f * t', 'v = t / d'],
    respuestaCorrecta: 'v = d / t',
  },
  {
    pregunta: '¿Qué unidad se usa para la fuerza?',
    opciones: ['Joules', 'Watts', 'Newtons', 'Pascal'],
    respuestaCorrecta: 'Newtons',
  },
  {
    pregunta: '¿Cuál es la aceleración de la gravedad en la Tierra?',
    opciones: ['9.8 m/s²', '10 m/s', '8.2 m/s²', '7 m/s²'],
    respuestaCorrecta: '9.8 m/s²',
  },
];

const ProblemasFisica = () => {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [puntos, setPuntos] = useState(0);

  const actual = problemas[indice];

  const manejarRespuesta = (opcion) => {
    setRespuesta(opcion);
    if (opcion === actual.respuestaCorrecta) {
      setPuntos((prev) => prev + 1);
    }

    setTimeout(() => {
      setRespuesta(null);
      if (indice + 1 < problemas.length) {
        setIndice(indice + 1);
      } else {
        alert(`🔬 Juego terminado. Tu puntaje: ${puntos + (opcion === actual.respuestaCorrecta ? 1 : 0)}`);
        setIndice(0);
        setPuntos(0);
      }
    }, 1500);
  };

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Problemas de Física</h2>
      <p className={styles['question']}>{actual.pregunta}</p>

      {actual.opciones.map((op, i) => (
        <button
          key={i}
          className={`${styles['option-button']} ${
            respuesta
              ? op === actual.respuestaCorrecta
                ? styles['correct']
                : respuesta === op
                ? styles['incorrect']
                : ''
              : ''
          }`}
          onClick={() => manejarRespuesta(op)}
          disabled={!!respuesta}
        >
          {op}
        </button>
      ))}

      <p className={styles['score']}>Puntaje: {puntos}</p>
    </div>
  );
};

export default ProblemasFisica;
