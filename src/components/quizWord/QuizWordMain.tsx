import React, {useEffect, useRef, useState} from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';

import styles from './QuizWordMain.module.scss';
import axios from 'axios';
import words from '../../utils/js/words';
import shuffle from '../../utils/js/shuffle';
import Score from '../shared/Score/Score';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const quizWordMain = () => {

  const [currentWord, setCurrentWord] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const hasPageBeenRendered = useRef(false);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | ''>('');

  interface Answer {
    answer: string,
    isCorrect: boolean
  }

  useEffect(() => {
    // console.log('first useEffect called');
    getRandomWord();
  }, [])

  const getRandomWord = () => {
    // console.log("getRandomWord called");
    axios.get(randomWordUrl)
      .then(response => {
        const randomWord = response.data[0];
        setRandomWord(randomWord);
        console.log("word taken from api");
      })
      .catch(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setRandomWord(randomWord);
        console.log("word taken from frontend");
      });
  };

  useEffect(() => {
    // console.log({randomWord});
    if (randomWord) {
      addWord(randomWord);
    }
  },
  [randomWord])

  const addWord = (word: string) => {
    axios.get(translationUrl + word)
      .then((response: any) => {
        const definition = response.data[0].meanings[0].definitions[0].definition
        if (definition) {
          if (!currentWord) {
            setCurrentWord(word);
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
            })
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setAnswers(prevState => [...prevState]);
      })
  }

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      // console.log({definitions});
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
    setCurrentWord('');
    setRandomWord('');
    setAnswers([]);
    hasPageBeenRendered.current = false;
    setDataReady(false);
    getRandomWord();
    setAnswered('');
  }

  const reset = () => {
    setCurrentWord('');
    setRandomWord('');
    setAnswers([]);
    hasPageBeenRendered.current = false;
    setDataReady(false);
    getRandomWord();
    setAnswered('');
    setScore(0);
  }

  const answersJsx = <>
    {answers.map((answer, index) => {
      return (
        <div 
          key={index}
          className={`${styles.Answer} ${answered && answer.isCorrect && styles.AnsweredCorrect} ${answered && !answer.isCorrect && styles.AnsweredWrong}`}
          onClick={() => answerClicked(answer.isCorrect)}>
            {answer.answer}
        </div>
      )
    })}
  </>

  const view = <>
    <div className={styles.Word}>{currentWord}</div>
    <div className={styles.AnswerWrap}>
      <div>
        {answersJsx}
      </div>
    </div>
    <Score answered={answered} score={score} />
    {
      answered === 'correct' ? 
        <div onClick={getNextQuestion} className={styles.NextBtn}>
          Next stage
        </div> : 
      answered === 'wrong' || answered === '' ? 
        <div onClick={reset} className={styles.NextBtn}>
          Restart
        </div> :
      ''
    }
  </>

  return (
    <div className={styles.QuizWordMain}>
      <Header text="english quiz word"/>
      {dataReady ? view : <Spinner />}
    </div>
  );

}


export default quizWordMain;
