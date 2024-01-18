import React from 'react';
import styles from './Question.module.scss';

const Question = (props: {currentQuestion: string}) => (
  <div className={styles.Question}>{props.currentQuestion}</div>
)

export default Question;