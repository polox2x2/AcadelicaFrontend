import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Academia. Todos los derechos reservados.
    </footer>
  );
};

export default Footer;