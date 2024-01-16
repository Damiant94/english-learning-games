import React from 'react';
import styles from './Question.module.scss';

const question = (props: {currentQuestion: string}) => (
  <div className={styles.Question}>{props.currentQuestion}</div>
)

export default question;