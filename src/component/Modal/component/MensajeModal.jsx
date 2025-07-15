import React, { useState } from 'react';
import styles from '../styles/MensajeModal.module.css';

const MensajeModal = ({ onClose }) => {
  const [destinatario, setDestinatario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!destinatario.trim() || !mensaje.trim()) {
      alert("Completa todos los campos");
      return;
    }

    // Aquí puedes agregar lógica para enviar el mensaje
    console.log("Enviando a:", destinatario);
    console.log("Mensaje:", mensaje);

    // Cerrar modal
    onClose();
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <h3>Nuevo Mensaje</h3>
        <form onSubmit={handleSubmit}>
          <label>Destinatario:</label>
          <input
            type="text"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            placeholder="Nombre del destinatario"
          />

          <label>Mensaje:</label>
          <textarea
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje..."
          ></textarea>

          <div className={styles['modal-buttons']}>
            <button type="submit" className={styles['send-btn']}>Enviar</button>
            <button type="button" onClick={onClose} className={styles['cancel-btn']}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MensajeModal;
