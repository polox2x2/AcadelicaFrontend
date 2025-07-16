import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style/GameMenu.module.css';

const GameMenu = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['menu']}>
      <h2 className={styles['menu-title']}>🎮 Selecciona un juego</h2>
      <button className={styles['menu-button']} onClick={() => navigate('/juegos/trivia-historia')}>
        🏛️ Trivia de Historia
      </button>
      <button className={styles['menu-button']} onClick={() => navigate('/juegos/problemas-fisica')}>
        ⚛️ Problemas de Física
      </button>
      <button className={styles['menu-button']} onClick={() => navigate('/juegos/matematica')}>
        ➕ Juego de Matemática
      </button>
    </div>
  );
};

export default GameMenu;