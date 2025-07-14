import React, { useState } from 'react';
import styles from './Form.module.css';

const CourseForm = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: course?.nombre || '',
    descripcion: course?.descripcion || '',
    duracion: course?.duracion || '',
    profesor: course?.profesor || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...course, ...formData });
  };

  return (
    <div className={styles.form}>
      <label>
        Nombre del Curso:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <label>
        Descripción:
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
      </label>
      <label>
        Duración:
        <input type="text" name="duracion" value={formData.duracion} onChange={handleChange} />
      </label>
      <label>
        Profesor:
        <input type="text" name="profesor" value={formData.profesor} onChange={handleChange} />
      </label>
      <div className={styles.buttons}>
        <button className={styles.save} onClick={handleSubmit}>Guardar</button>
        <button className={styles.cancel} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default CourseForm;
