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


const QuizWord = () => {

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
    <Layout>
      <div className={styles.QuizWordMain}>
        <Header text="word quiz" />
        {dataReady ? view : <Spinner />}
      </div>
    </Layout>
  );
}


export default QuizWord;
