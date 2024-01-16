import React, {useEffect, useRef, useState} from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';

import styles from './QuizReversedMain.module.scss';
import axios from 'axios';
import words from '../../utils/js/words';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
let shuffle = (a: any[]) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const quizReversedMain = () => {

  const [currentDefinition, setCurrentDefinition] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [wordsAnswers, setWordsAnswers] = useState<WordAnswer[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | ''>('');

  interface WordAnswer {
    word: string,
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
      addDefinition(randomWord);
    }
  },
  [randomWord])

  const addDefinition = (word: string) => {
    axios.get(translationUrl + word)
      .then((response: any) => {
        const definition = response.data[0].meanings[0].definitions[0].definition
        if (definition) {
          setCurrentDefinition(definition);
          setWordsAnswers([{
            word: word,
            isCorrect: true
          }]);
        } else {
          getRandomWord();
        }
      })
      .catch((err) => {
        console.log(err);
        getRandomWord();
      })
  }

  useEffect(() => {
    if (currentDefinition) {
      // console.log({currentDefinition});
      get3RandomWords();
    }
  },
  [currentDefinition])

  const get3RandomWords = () => {
    // console.log("getRandomWords called");
    axios.get(`${randomWordUrl}s?number=3`)
      .then(response => {
        const randomWords = response.data;
        console.log(randomWords);
        setWordsAnswers(prevState => {
          const newWordsAnswers = randomWords.map((word: string) => {
            return {word: word, isCorrect: false};
          })
          const finalWords = prevState.concat(newWordsAnswers);
          shuffle(finalWords)
          return finalWords;
        });
        console.log("word taken from api");
      })
      .catch(() => {
        const randomWords = words.sort(() => 0.5 - Math.random()).slice(0, 3);
        setWordsAnswers(prevState => {
          const newWordsAnswers = randomWords.map((word: string) => {
            return {word: word, isCorrect: false};
          })
          const finalWords = prevState.concat(newWordsAnswers);
          shuffle(finalWords)
          return finalWords;
        });
        console.log("word taken from frontend");
      })
      .finally(() => {
        setDataReady(true);
      });
  };

  const answerClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevState => prevState + 1);
      setAnswered('correct');
    } else {
      setAnswered('wrong');
      // console.log('wrong answer');
    }
  }

  const getNextDefinition = () => {
    setCurrentDefinition('');
    setRandomWord('');
    setWordsAnswers([]);
    setDataReady(false);
    getRandomWord();
    setAnswered('');
  }

  const reset = () => {
    setCurrentDefinition('');
    setRandomWord('');
    setWordsAnswers([]);
    setDataReady(false);
    getRandomWord();
    setAnswered('');
    setScore(0);
  }

  const answers = <>
    {wordsAnswers.map((wordAnswer, index) => {
      return (
        <div 
          key={index}
          className={`${styles.Answer} ${answered && wordAnswer.isCorrect && styles.AnsweredCorrect} ${answered && !wordAnswer.isCorrect && styles.AnsweredWrong}`}
          onClick={() => answerClicked(wordAnswer.isCorrect)}>
            {wordAnswer.word}
        </div>
      )
    })}
  </>

  const view = <>
    <div className={styles.Question}>{currentDefinition}</div>
    <div className={styles.AnswerWrap}>
      <div>
        {answers}
      </div>
    </div>
    <div className={styles.ScoreWrap}>
      <div className={answered === 'correct' ? styles.Correct : answered === 'wrong' ? styles.Wrong : ''}>
        {answered === 'correct' ? 'Answer correct' : answered === 'wrong' ? 'Answer Wrong' : 'Waiting for answer...'}
      </div>
      <div className={styles.Score}>
        Score: {score}
      </div>
    </div>
    {
      answered === 'correct' ? 
        <div onClick={getNextDefinition} className={styles.NextBtn}>
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
    <div className={styles.QuizReversedMain}>
      <Header text="english quiz reversed"/>
      {dataReady ? view : <Spinner />}
    </div>
  );

}


export default quizReversedMain;
