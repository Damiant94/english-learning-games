import React, { useEffect, useRef, useState } from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';
import Score from '../shared/Score/Score';
import Answers from '../shared/Answers/Answers';
import Question from '../shared/Question/Question';
import Btn from '../shared/Btn/Btn';

import { getDefinitionApi, getRandomWordApi } from '@/utils/api/api';
import shuffle from '../../utils/js/shuffle';
import Answer from '@/utils/interfaces/Answer';

import styles from './QuizWord.module.scss';
import Layout from '../shared/Layout/Layout';
import Answered from '@/utils/interfaces/Answered';
import getRandomInt from '@/utils/js/getRandomInt';


const QuizWord = () => {

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Answered>(Answered.NOT_ANSWERED);
  const [is5050used, setIs5050used] = useState(false);

  const hasPageBeenRendered = useRef(false);

  useEffect(() => {
    getRandomWord();
  }, [])

  const getRandomWord = async () => {
    const randomWord = await getRandomWordApi();
    setRandomWord(randomWord);
  };

  useEffect(() => {
    if (randomWord) {
      addWord(randomWord);
    }
  },
    [randomWord])

  const addWord = async (word: string) => {
    const definition = await getDefinitionApi(word);
    if (definition) {
      if (!currentQuestion) {
        setCurrentQuestion(word);
        setAnswers([{
          answer: definition,
          isCorrect: true,
          isActive: true
        }]);
      } else {
        setAnswers(prevState => {
          const definitions = [...prevState];
          definitions.push({
            answer: definition,
            isCorrect: false,
            isActive: true
          });
          return definitions;
        });
      };
    } else {
      getRandomWord();
    };
  }

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      if (answers.length < 4) {
        getRandomWord();
      } else {
        setAnswers(prevState => {
          shuffle(prevState);
          return prevState;
        });
        setDataReady(true);
      }
    }
    hasPageBeenRendered.current = true;
  },
    [answers.length])

  const answerClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevState => prevState + 1);
      setAnswered(Answered.CORRECT);
    } else {
      setAnswered(Answered.WRONG);
    }
  }

  const disableTwoWrongAnswers = (answers: Answer[]) => {
    const indices = [0, 1, 2, 3];
    let correctIndex: number;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].isCorrect === true) {
        correctIndex = i;
        break;
      }
    };
    const wrongIndices = indices.filter(index => {
      return index !== correctIndex;
    });
    const randomIndex = getRandomInt(wrongIndices.length);
    wrongIndices.splice(randomIndex, 1);
    wrongIndices.forEach(index => {
      answers[index].isActive = false;
    });
    return [...answers];
  }

  const use5050 = () => {
    setAnswers(prevState => {
      const newAnswers = disableTwoWrongAnswers(prevState);
      return newAnswers;
    });
    setIs5050used(true);
  }

  const getNextQuestion = () => {
    hasPageBeenRendered.current = false;
    setCurrentQuestion('');
    setRandomWord('');
    setAnswers([]);
    setDataReady(false);
    setAnswered(Answered.NOT_ANSWERED);
    getRandomWord();
  }

  const restart = () => {
    getNextQuestion();
    setScore(0);
    setIs5050used(false);
  }

  const view = <>
    <Question currentQuestion={currentQuestion} />
    <Answers answers={answers} answered={answered} answerClicked={answerClicked} />
    <Btn text='50/50' clickHandle={use5050} isUsed={is5050used} status={answered} />
    <Score answered={answered} score={score} />
    <Btn text={answered === Answered.CORRECT ? 'Next Question' : 'Restart'} clickHandle={answered === Answered.CORRECT ? getNextQuestion : restart} />
  </>

  return (
    <Layout>
      <div className={styles.QuizWordMain} data-testid='quizWord'>
        <Header text="word quiz" />
        {dataReady ? view : <Spinner />}
      </div>
    </Layout>
  );
}


export default QuizWord;
