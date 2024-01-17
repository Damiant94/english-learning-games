import React, { useEffect, useRef, useState } from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';

import styles from './QuizWordMain.module.scss';
import shuffle from '../../utils/js/shuffle';
import Score from '../shared/Score/Score';
import Answers from '../shared/Answers/Answers';
import Answer from '@/utils/interfaces/Answer';
import Question from '../shared/Question/Question';
import Btn from '../shared/Btn/Btn';

import { getDefinitionApi, getRandomWordApi } from '@/utils/api/api';

const quizWordMain = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | ''>('');

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
    if (await definition) {
      if (!currentQuestion) {
        setCurrentQuestion(word);
        setAnswers([{
          answer: definition,
          isCorrect: true
        }]);
      } else {
        setAnswers(prevState => {
          const definitions = [...prevState];
          definitions.push({
            answer: definition,
            isCorrect: false
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
        setAnswers(prevState => shuffle(prevState));
        setDataReady(true);
      }
    }
    hasPageBeenRendered.current = true;
  },
    [answers])

  const answerClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevState => prevState + 1);
      setAnswered('correct');
    } else {
      setAnswered('wrong');
    }
  }

  const getNextQuestion = () => {
    setCurrentQuestion('');
    setRandomWord('');
    setAnswers([]);
    hasPageBeenRendered.current = false;
    setDataReady(false);
    getRandomWord();
    setAnswered('');
  }

  const restart = () => {
    setCurrentQuestion('');
    setRandomWord('');
    setAnswers([]);
    hasPageBeenRendered.current = false;
    setDataReady(false);
    getRandomWord();
    setAnswered('');
    setScore(0);
  }

  const view = <>
    <Question currentQuestion={currentQuestion} />
    <Answers answers={answers} answered={answered} answerClicked={answerClicked} />
    <Score answered={answered} score={score} />
    <Btn text={answered === 'correct' ? 'Next Question' : 'Restart'} clickHandle={answered === 'correct' ? getNextQuestion : restart} />
  </>

  return (
    <div className={styles.QuizWordMain}>
      <Header text="english quiz word" />
      {dataReady ? view : <Spinner />}
    </div>
  );

}


export default quizWordMain;
