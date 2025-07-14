import React, { useEffect, useState } from 'react';
import styles from './SchoolAdminCRUD.module.css';
import axios from 'axios';
import ModalForm from '../Modal/Modal';

const SchoolAdminCRUD = () => {
  const [data, setData] = useState({ alumnos: [], cursos: [], profesores: [], horarios: [] });
  const [activo, setActivo] = useState('alumnos');
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [elementoEditar, setElementoEditar] = useState(null);

  const fetchAll = async () => {
    try {
      const [alumnosRes, cursosRes, profesoresRes, horariosRes] = await Promise.all([
        axios.get('http://localhost:8080/api/alumno/obtener'),
        axios.get('http://localhost:8080/api/curso/cursos'),
        axios.get('http://localhost:8080/api/profesor/obtener'),
        axios.get('http://localhost:8080/api/horario/obtener')
      ]);
      setData({
        alumnos: alumnosRes.data,
        cursos: cursosRes.data,
        profesores: profesoresRes.data,
        horarios: horariosRes.data
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const datosFiltrados = () => {
    const lista = data[activo];
    if (!lista) return [];

    return lista.filter(item =>
      Object.values(item || {})
        .flatMap(value => {
          if (value === null || value === undefined) return [];
          if (typeof value === 'object') {
            return Array.isArray(value)
              ? value.flatMap(sub => (typeof sub === 'object' ? Object.values(sub) : sub))
              : Object.values(value);
          }
          return value;
        })
        .some(val => val?.toString().toLowerCase().includes(busqueda.toLowerCase()))
    );
  };

  const handleEditar = (item) => {
    setElementoEditar(item);
    setModalVisible(true);
  };

  const handleGuardar = async (actualizado) => {
    try {
      await axios.put(`http://localhost:8080/api/${activo}/actualizar/${actualizado.id}`, actualizado);
      setModalVisible(false);
      setElementoEditar(null);
      fetchAll();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const renderizarTabla = () => {
    const lista = datosFiltrados();
    if (!lista.length) return <p>No hay datos para mostrar.</p>;

    const headers = Object.keys(lista[0] || {}).filter(k => k !== 'id' && k !== 'fecha_Registro');

    return (
      <table className={styles.tabla}>
        <thead>
          <tr>
            {headers.map(key => <th key={key}>{key}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item, idx) => (
            <tr key={idx}>
              {headers.map(key => (
                <td key={key} className={styles.cell}>
                  {key === 'horarioID' && Array.isArray(item[key]) ? (
                    item[key].length > 0 ? (
                      <div className={styles['badge-container']}>
                        {item[key].map((horario, i) => (
                          <span key={i} className={styles.badge}>
                            {`${horario.horario || ''} ${horario.horainicio || ''} - ${horario.horafin || ''}`}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles['badge-empty']}>Sin horarios</span>
                    )
                  ) : key === 'horarioID' && typeof item[key] === 'object' && item[key] !== null ? (
                    `${item[key].horario || ''} ${item[key].horainicio || ''} - ${item[key].horafin || ''}`
                  ) : Array.isArray(item[key]) ? (
                    item[key].length > 0 ? (
                      <div className={styles['badge-container']}>
                        {item[key].map((val, i) => (
                          <span key={i} className={styles.badge}>
                            {typeof val === 'object' ? val.nombre || val.dia || JSON.stringify(val) : val}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles['badge-empty']}>Sin elementos</span>
                    )
                  ) : typeof item[key] === 'object' && item[key] !== null ? (
                    item[key].nombre || item[key].dia || JSON.stringify(item[key])
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              <td>
                <button className={styles.botonEditar} onClick={() => handleEditar(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.adminPanel}>
      <h1 className={styles.titulo}>Panel de Administración</h1>

      <div className={styles.botonesMenu}>
        <button onClick={() => setActivo('alumnos')} className={activo === 'alumnos' ? styles.activo : ''}>Estudiantes</button>
        <button onClick={() => setActivo('cursos')} className={activo === 'cursos' ? styles.activo : ''}>Cursos</button>
        <button onClick={() => setActivo('profesores')} className={activo === 'profesores' ? styles.activo : ''}>Profesores</button>
        <button onClick={() => setActivo('horarios')} className={activo === 'horarios' ? styles.activo : ''}>Horarios</button>
      </div>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className={styles.buscador}
      />

      <div className={styles.tablaContainer}>
        {renderizarTabla()}
      </div>

      {modalVisible && (
        <ModalForm
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleGuardar}
          data={elementoEditar}
        />
      )}
    </div>
  );
};

export default SchoolAdminCRUD;
