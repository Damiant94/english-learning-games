import React from 'react';
import styles from './Score.module.scss';
import Answered from '@/utils/interfaces/Answered';

const Score = (props: {answered: Answered, score: number}) => (
  <div className={styles.ScoreWrap}>
    <div className={props.answered === Answered.CORRECT ? styles.Correct : props.answered === Answered.WRONG ? styles.Wrong : ''}>
      {props.answered === Answered.CORRECT ? 'Answer correct' : props.answered === Answered.WRONG ? 'Answer Wrong' : 'Waiting for answer..'}
    </div>
    <div className={styles.Score}>
      Score: {props.score}
    </div>
  </div>
);

export default Score;