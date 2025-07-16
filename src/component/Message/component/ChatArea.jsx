import React, { useState, useEffect } from 'react';
import styles from '../styles/ChatArea.module.css';
import MessageInput from '../component/MessageInput';
import MensajeModal from '../../Modal/component/MensajeModal';
import axios from 'axios';

const ChatArea = ({ selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const [usuario, setUsuario] = useState({ nombre: '' });
  const [showModal, setShowModal] = useState(false);

  const correo = localStorage.getItem('correoAlumno');
  const token = localStorage.getItem('token'); // ✅ Agrega el token

  // Obtener datos del alumno
  useEffect(() => {
    const handleStorageChange = () => {
      if (correo && token) {
        axios
          .get(`http://localhost:8080/api/alumno/obtenerCorreo?correo=${encodeURIComponent(correo)}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => setUsuario(res.data))
          .catch((err) => console.error('Error al obtener alumno:', err));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [correo, token]);

  // Enviar mensaje
  const handleSend = async (msg) => {
    if (msg.trim() && selectedContact && usuario.id) {
      const mensajeDTO = {
        contenido: msg,
        estado: true,
        emisorAlumnoId: usuario.id,
        receptorProfesorId: selectedContact.id,
      };

      try {
        const response = await axios.post(
          'http://localhost:8080/api/mensaje/enviar',
          mensajeDTO,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const mensajeEnviado = response.data;
        setMessages((prev) => [...prev, mensajeEnviado]);
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  // Cargar mensajes periódicamente
  useEffect(() => {
    let intervalId;

    const cargarMensajes = async () => {
      try {
        if (usuario.id && selectedContact?.id) {
          const res = await axios.get(
            `http://localhost:8080/api/mensaje/alumno/${usuario.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const mensajesFiltrados = res.data.filter(
            (m) =>
              (m.emisorProfesorId === selectedContact.id && m.receptorAlumnoId === usuario.id) ||
              (m.emisorAlumnoId === usuario.id && m.receptorProfesorId === selectedContact.id)
          );
          setMessages(mensajesFiltrados);
        }
      } catch (error) {
        console.error('Error al actualizar mensajes:', error);
      }
    };

    if (usuario?.id && selectedContact?.id) {
      cargarMensajes(); // Carga inicial
      intervalId = setInterval(cargarMensajes, 3000); // Auto-actualización
    }

    return () => clearInterval(intervalId); // Limpiar al desmontar
  }, [usuario.id, selectedContact?.id, token]);

  // Auto scroll
  useEffect(() => {
    const chatContainer = document.querySelector(`.${styles['chat-messages']}`);
    if (!chatContainer) return;

    const isNearBottom =
      chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 50;

    if (isNearBottom) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles['chat-area']}>
      <div className={styles['chat-header']}>
        {usuario ? `Bienvenido: ${usuario.nombre}` : 'Cargando nombre...'}
        <button
          className={styles['new-message-btn']}
          onClick={() => setShowModal(true)}
        >
          <span>📝</span>
          Nuevo Mensaje
        </button>
      </div>

      <div className={styles['chat-messages']}>
        {selectedContact ? (
          <>
            <div className={styles['contact-name']}>
              <strong>
                Conversación con: {selectedContact.nombre} {selectedContact.apellido}
              </strong>
            </div>
            {messages.length === 0 ? (
              <div className={styles['message-placeholder']}>
                Aquí aparecerán los mensajes
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.emisorAlumnoId === usuario.id
                      ? styles['sent-message']
                      : styles['received-message']
                  }
                >
                  {msg.contenido}
                </div>
              ))
            )}
          </>
        ) : (
          <div className={styles['message-placeholder']}>
            Selecciona un contacto para iniciar una conversación
          </div>
        )}
      </div>

      <MessageInput onSend={handleSend} />

      {showModal && <MensajeModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ChatArea;
