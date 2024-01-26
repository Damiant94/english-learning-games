import React from 'react';
import styles from './Answers.module.scss';
import Answer from '../../../utils/interfaces/Answer';
import Answered from '@/utils/interfaces/Answered';

const Answers = (props: {answers: Answer[], answered: Answered, answerClicked: (answer: boolean) => void}) => {

  const answersJsx = <>
    {props.answers.map((answer: Answer, index: number) => {
      return (
        <div 
          key={index}
          className={`${styles.Answer} ${props.answered && answer.isCorrect && styles.AnsweredCorrect} ${props.answered && !answer.isCorrect && styles.AnsweredWrong}`}
          onClick={() => props.answerClicked(answer.isCorrect)}
          data-testid="answer">
            <p data-testid={answer.isCorrect ? 'answeredCorrect' : 'answeredWrong'}>{answer.answer}</p>
        </div>
      )
    })}
  </>

  return (
    <div className={styles.Answers} data-testid='answers'>
      {answersJsx}
    </div>
  )
};

export default Answers;