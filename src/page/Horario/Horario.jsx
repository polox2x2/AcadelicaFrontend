import React from "react";
import styles from "./style/horario.module.css";  // Asegúrate de que la ruta esté correcta

function Horario() {

  const horarios = [
    { dia: 'Lunes', hora: '09:00-10:30', curso: 'Inglés Conversacional', profesor: 'Laura Gómez' },
    { dia: 'Martes', hora: '09:00-10:30', curso: 'Inglés Conversacional', profesor: 'Laura Gómez' },
    { dia: 'Miércoles', hora: '09:00-10:30', curso: 'Inglés Conversacional', profesor: 'Laura Gómez' },
    { dia: 'Jueves', hora: '09:00-10:30', curso: 'Inglés Conversacional', profesor: 'Laura Gómez' },
    { dia: 'Viernes', hora: '09:00-10:30', curso: 'Inglés Conversacional', profesor: 'Laura Gómez' },
  ];

  const handleAcceder = (dia) => {
    // Función de acceso (puedes llenarla de acuerdo con tu lógica)
  };

  return (
    <>
    <div className={styles['horario-container']}>
      <div className={styles['horario-header']}>
        HORARIO DE CLASES
      </div>

      <div className={styles['horario-table-container']}>
        <table className={styles['horario-table']}>
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora</th>
              <th>Curso</th>
              <th>Profesor</th>
              <th>Acceso</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario, index) => (
              <tr key={index}>
                <td>{horario.dia}</td>
                <td>{horario.hora}</td>
                <td>{horario.curso}</td>
                <td>{horario.profesor}</td>
                <td>
                  <button
                    onClick={() => handleAcceder(horario.dia)}
                    className={styles['acceder-button']}
                  >
                    ACCEDER
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Horario;
