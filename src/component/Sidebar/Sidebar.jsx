import React from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ expanded }) => {
  const menuItems = [
    { icon: '📋', label: 'Principal', path: '/principal' },
    { icon: '👥', label: 'Estudiantes', path: '/estudiantes' },
    { icon: '▶', label: 'Cursos', path: '/cursos' },
    { icon: '📧', label: 'Mensajes', path: '/mensajes' },
    { icon: '🖼', label: 'Galería', path: '/galeria' },
  ];

  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : ''}`}>
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `${styles['sidebar-item']} ${isActive ? styles.active : ''}`
          }
        >
          <div className={styles['sidebar-icon']}>{item.icon}</div>
          <div className={styles['sidebar-text']}>{item.label}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;