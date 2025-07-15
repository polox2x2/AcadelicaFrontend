
import React, { useEffect, useState } from 'react';
import styles from '../styles/ContactsArea.module.css';
import axios from 'axios';



const ContactsArea = ({ onSelect }) => {
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/profesor/clases')
      .then(res => setProfesores(res.data))
      .catch(err => console.error('Error al cargar profesores:', err));
  }, []);

  return (
    <div className={styles['contacts-area']}>
      {profesores.map((prof) => (
        <div
          key={prof.id}
          className={styles['contact-item']}
          onClick={() => onSelect(prof)}
        >
          <div className={styles['contact-avatar']}>👨‍🏫</div>
          <div className={styles['contact-name']}>
            {prof.nombre} {prof.apellido}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsArea;