import React, {useEffect, useRef, useState} from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';

import styles from './QuizMain.module.scss';
import axios from 'axios';
import words from '../../utils/js/words';
import shuffle from '../../utils/js/shuffle';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const quizMain = () => {

  const [currentWord, setCurrentWord] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const hasPageBeenRendered = useRef(false);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | ''>('');

  interface Definition {
    definition: string,
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
            setDefinitions([{
              definition: definition,
              isCorrect: true
            }]);
          } else {
            setDefinitions(prevState => {
              const definitions = [...prevState];
              definitions.push({
                definition: definition,
                isCorrect: false
              });
              return definitions;
            })
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setDefinitions(prevState => [...prevState]);
      })
  }

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      // console.log({definitions});
      if (definitions.length < 4) {
        getRandomWord();
      } else {
        setDefinitions(prevState => shuffle(prevState));
        setDataReady(true);
      }
    }
    hasPageBeenRendered.current = true;
  },
  [definitions])

  const answerClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevState => prevState + 1);
      setAnswered('correct');
    } else {
      setAnswered('wrong');
      console.log('wrong answer');
    }
  }

  const getNextWord = () => {
    setCurrentWord('');
    setRandomWord('');
    setDefinitions([]);
    hasPageBeenRendered.current = false;
    setDataReady(false);
    getRandomWord();
    setAnswered('');
  }

  const reset = () => {
    setCurrentWord('');
    setRandomWord('');
    setDefinitions([]);
    hasPageBeenRendered.current = false;
    setDataReady(false);
    getRandomWord();
    setAnswered('');
    setScore(0);
  }

  const answers = <>
    {definitions.map((definition, index) => {
      return (
        <div 
          key={index}
          className={`${styles.Answer} ${answered && definition.isCorrect && styles.AnsweredCorrect} ${answered && !definition.isCorrect && styles.AnsweredWrong}`}
          onClick={() => answerClicked(definition.isCorrect)}>
            {definition.definition}
        </div>
      )
    })}
  </>

  const view = <>
    <div className={styles.Word}>{currentWord}</div>
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
        <div onClick={getNextWord} className={styles.NextBtn}>
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
    <div className={styles.QuizMain}>
      <Header text="english quiz"/>
      {dataReady ? view : <Spinner />}
    </div>
  );

}


export default quizMain;
