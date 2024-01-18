import React from 'react';
import styles from './Score.module.scss';
import Answered from '@/utils/interfaces/Answered';

const Score = (props: {answered: Answered, score: number}) => (
  <div className={styles.ScoreWrap}>
    <div className={props.answered === 'correct' ? styles.Correct : props.answered === 'wrong' ? styles.Wrong : ''}>
      {props.answered === 'correct' ? 'Answer correct' : props.answered === 'wrong' ? 'Answer Wrong' : 'Waiting for answer..'}
    </div>
    <div className={styles.Score}>
      Score: {props.score}
    </div>
  </div>
);

export default Score;