import React, { Component } from 'react'
import styles from "./style/coursecard.module.css"

const CourseCard = ({ icon, titulo, docente }) => {
  return (
    <div className={styles['course-card']}>
      <div className={styles['course-image']}>{icon}</div>
      <div className={styles['course-title']}>{titulo}</div>
      <div className={styles['course-instructor']}>Profesor: {docente}</div>
     
    </div>
  );
};

export default CourseCard;
