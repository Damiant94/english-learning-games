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
import getRandomInt from '@/utils/js/getRandomInt';
import Answer from '@/utils/interfaces/Answer';

import styles from './QuizDefinition.module.scss';
import Answered from '@/utils/interfaces/Answered';



const QuizDefinition = () => {

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Answered>(Answered.NOT_ANSWERED);
  const [is5050used, setIs5050used] = useState(false);

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
    if (definition) {
      setCurrentQuestion(definition as string);
      setAnswers([{
        answer: word,
        isCorrect: true,
        isActive: true
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
        return { answer: word, isCorrect: false, isActive: true };
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
      <div className={styles.QuizDefinitionMain} data-testid='quizDefinition'>
        <Header text="definition quiz" />
        {dataReady ? view : <Spinner />}
      </div>
    </Layout>
  );
}


export default QuizDefinition;
