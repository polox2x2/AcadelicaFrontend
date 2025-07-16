import React from 'react';
import styles from "./style/coursecard.module.css";
import { Link } from 'react-router-dom';

const CourseCard = ({ icon, titulo, docente, id }) => {
  return (
    <Link to={`/curso/${id}`} className={styles['link-wrapper']}>
      <div className={styles['course-card']}>
        <div className={styles['course-image']}>{icon}</div>
        <div className={styles['course-title']}>{titulo}</div>
        <div className={styles['course-instructor']}>Profesor: {docente}</div>
      </div>
    </Link>
  );
};

export default CourseCard;
