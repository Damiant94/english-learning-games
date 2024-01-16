import React, {useEffect, useState} from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';

import styles from './QuizDefinitionMain.module.scss';
import axios from 'axios';
import words from '../../utils/js/words';
import shuffle from '../../utils/js/shuffle';
import Score from '../shared/Score/Score';
import Answers from '../shared/Answers/Answers';
import Answer from '@/utils/interfaces/Answer';
import Question from '../shared/Question/Question';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const quizDefinitionMain = () => {

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | ''>('');

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
          setCurrentQuestion(definition);
          setAnswers([{
            answer: word,
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
    if (currentQuestion) {
      // console.log({currentDefinition});
      get3RandomWords();
    }
  },
  [currentQuestion])

  const get3RandomWords = () => {
    // console.log("getRandomWords called");
    axios.get(`${randomWordUrl}s?number=3`)
      .then(response => {
        const randomWords = response.data;
        // console.log(randomWords);
        setAnswers(prevState => {
          const newWordsAnswers = randomWords.map((word: string) => {
            return {answer: word, isCorrect: false};
          })
          const finalWords = prevState.concat(newWordsAnswers);
          shuffle(finalWords)
          return finalWords;
        });
        console.log("3 words taken from api");
      })
      .catch(() => {
        const randomWords = words.sort(() => 0.5 - Math.random()).slice(0, 3);
        setAnswers(prevState => {
          const newWordsAnswers = randomWords.map((word: string) => {
            return {answer: word, isCorrect: false};
          })
          const finalWords = prevState.concat(newWordsAnswers);
          shuffle(finalWords)
          return finalWords;
        });
        console.log("3 words taken from frontend");
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

  const reset = () => {
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
    <Answers answers={answers} answered={answered} answerClicked={answerClicked}/>
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
    <div className={styles.QuizDefinitionMain}>
      <Header text="english quiz definition"/>
      {dataReady ? view : <Spinner />}
    </div>
  );

}


export default quizDefinitionMain;
