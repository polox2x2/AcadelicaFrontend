import React, { useState } from 'react';
import styles from '../styles/Modal.module.css';

const ModalForm = ({ visible, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.entries(formData).map(([key, value]) => (
            typeof value !== 'object' ? (
              <div key={key} className={styles.formGroup}>
                <label>{key}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            ) : null
          ))}
          <div className={styles.buttonGroup}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
