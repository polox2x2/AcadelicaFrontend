
import React, { useState,useEffect } from 'react';
import styles from './style/Mensajes.module.css';
import ChatArea from '../../component/Message/component/ChatArea';
import ContactsArea from '../../component/Message/component/ContactsArea';
import axios from 'axios';
const Mensajes = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const correo = localStorage.getItem('correoAlumno');
    if (correo) {
      axios.get(`http://localhost:8080/api/alumno/obtenerCorreo?correo=${correo}`)
        .then(res => setUsuario(res.data))
        .catch(err => console.error('Error obteniendo alumno:', err));
    }
  }, []);

  return (
    <div className={styles['messages-container']}>
      <ChatArea selectedContact={selectedContact} usuario={usuario} />
      <ContactsArea alumnoId={usuario?.id} onSelect={setSelectedContact} />
    </div>
  );
};

export default Mensajes;