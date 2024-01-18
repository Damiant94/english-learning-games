import React, { useEffect, useState } from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';
import Score from '../shared/Score/Score';
import Answers from '../shared/Answers/Answers';
import Question from '../shared/Question/Question';
import Btn from '../shared/Btn/Btn';
import Layout from '../shared/Layout/Layout';

import { get3RandomWordsApi, getDefinitionApi, getRandomWordApi } from '@/utils/api/api';
import shuffle from '../../utils/js/shuffle';
import Answer from '@/utils/interfaces/Answer';

import styles from './QuizDefinition.module.scss';


const QuizDefinition = () => {

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | ''>('');

  useEffect(() => {
    getRandomWord();
  }, [])

  const getRandomWord = async () => {
    const randomWord = await getRandomWordApi();
    setRandomWord(randomWord);
  };

  useEffect(() => {
    if (randomWord) {
      addDefinition(randomWord);
    }
  },
    [randomWord])

  const addDefinition = async (word: string) => {
    const definition = await getDefinitionApi(word);
    if (await definition) {
      setCurrentQuestion(definition);
      setAnswers([{
        answer: word,
        isCorrect: true
      }]);
    } else {
      getRandomWord();
    };
  }

  useEffect(() => {
    if (currentQuestion) {
      get3RandomWords();
    }
  },
    [currentQuestion])

  const get3RandomWords = async () => {
    const randomWords = await get3RandomWordsApi();
    setAnswers(prevState => {
      const newWordsAnswers = randomWords.map((word: string) => {
        return { answer: word, isCorrect: false };
      })
      const finalWords = prevState.concat(newWordsAnswers);
      shuffle(finalWords)
      return finalWords;
    });
  };

  useEffect(() => {
    if (answers.length === 4) {
      setDataReady(true);
    };
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
    setDataReady(false);
    getRandomWord();
    setAnswered('');
  }

  const restart = () => {
    setCurrentQuestion('');
    setRandomWord('');
    setAnswers([]);
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
      <div className={styles.QuizDefinitionMain}>
        <Header text="definition quiz" />
        {dataReady ? view : <Spinner />}
      </div>
    </Layout>
  );
}


export default QuizDefinition;
