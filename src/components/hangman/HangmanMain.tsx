import React, {useEffect, useState} from 'react';
import Header from '../shared/Header/Header';
import Hearts from './components/Hearts/Hearts';
import Sentence from './components/Sentence/Sentence';
import Letters from './components/Letters/Letters';
import Reset from '../shared/Btn/Btn';
import Result from './components/Result/Result';
import Spinner from '../shared/Spinner/Spinner';
import Backdrop from './components/Backdrop/Backdrop';
import Translation from './components/Translation/Translation';

import classes from './HangmanMain.module.scss';
import classesHeart from './components/Hearts/Heart/Heart.module.scss';
import classesLetter from './components/Letters/Letter/Letter.module.scss';

import axios from 'axios';

import Btn from '../shared/Btn/Btn';
import { getDefinitionsApi, getRandomWordApi } from '@/utils/api/api';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const hangmanMain = () => {

  const [sentence, setSentence] = useState<string[]>([]);
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [definitions, setDefinitions] = useState<any>([]);
  const [currentDefinition, setCurrentDefinition] = useState<any>('');
  const [lives, setLives] = useState(9);
  const [status, setStatus] = useState('progress');
  const [backdrop, setBackdrop] = useState(false);

  const setFreshState = () => {
    setSentence([]);
    setCurrentSentence('');
    setDefinitions([]);
    setCurrentDefinition('');
    setLives(9);
    setStatus('progress');
    setBackdrop(false);
  };

  const setNewSentence = (sentence: string[]) => {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentSentence = "";
    for (const letter of sentence) {
      if (allLetters.includes(letter)) {
        currentSentence += "_";
      } else {
        currentSentence += letter;
      }
    }
    setSentence(sentence);
    setCurrentSentence(currentSentence);
    setNewDefinitions(sentence.join(""));
  };

  const createSentence = async () => {
    const response = await getRandomWordApi();
    const sentence = response.toUpperCase().split("");
    setNewSentence(sentence);
  };

  const setNewDefinitions = async (word: string) => {
    const definitions = await getDefinitionsApi(word);
    setDefinitions(definitions);
    setCurrentDefinition(definitions[0]);
  };

  useEffect(() => {
    createSentence();
  }, [])

  const restart = () => {
    setFreshState();
    createSentence();

    for (const button of document.querySelectorAll(`.${classesLetter.Correct}, .${classesLetter.Wrong}`) as NodeListOf<HTMLButtonElement>) {
      button.className = classesLetter.Letter;
      button.disabled = false;
    }

    for (const heart of document.querySelectorAll(`.${classesHeart.HeartLost}`)) {
      heart.className = classesHeart.Heart;
    }
  };

  const correctLetterHandle = (clickedLetter: any) => {
    clickedLetter.classList.add(classesLetter.Correct);
    let newCurrentSentence = "";
    for (const letter of sentence) {
      if (letter === clickedLetter.innerHTML || letter === " " || currentSentence.includes(letter)) {
        newCurrentSentence += letter;
      } else {
        newCurrentSentence += "_";
      }
    }
    setCurrentSentence(newCurrentSentence);
    if (!newCurrentSentence.includes("_")) {
      setStatus('win');
    }
  };

  const wrongLetterHandle = (clickedLetter: any) => {
    clickedLetter.classList.add(classesLetter.Wrong);
    document.querySelector(`[data-heart="${lives}"]`)!.className = classesHeart.HeartLost;

    if (lives === 1) {
      setStatus('lose');
    }
    setLives(prevState => prevState - 1)
  };

  const letterClickHandler = (clickedLetter: any) => {
    clickedLetter.disabled = true;
    if (sentence.includes(clickedLetter.innerHTML)) {
      correctLetterHandle(clickedLetter);
    } else {
      wrongLetterHandle(clickedLetter);
    }
  };

  const showDefinitionsHandler = () => {
    setBackdrop(true);
  };

  const hideDefinitionsHandler = () => {
    setBackdrop(false);
  }

  const changeDefinitionHandler = () => {
      const definitionsNumber = definitions.length;
      const currentDefinitionIndex = definitions.indexOf(currentDefinition);
      const newDefinitionIndex = definitionsNumber - 1 !== currentDefinitionIndex ? currentDefinitionIndex + 1 : 0;
      setCurrentDefinition(definitions[newDefinitionIndex]);
  };

  let view = null;
  if (status === 'progress') {
    view = (
      <>
        <Sentence currentSentence={currentSentence} />
        <Letters clickHandle={letterClickHandler} />
        <Btn clickHandle={restart} text="Reset"/>
      </>
    );
  } else {
    let message, classColor;
    if (status === 'win') {
      message = "You won!";
      classColor = "Win";
    } else if (status === 'lose') {
      message = "You lose.";
      classColor = "Lose";
    } else {
      throw new Error('status has wrong value');
    }
    view = (
      <>
        <Translation 
          definition={currentDefinition}
          definitionsNumber={definitions ? definitions.length : null} 
          show={backdrop}
          change={changeDefinitionHandler}
          hide={hideDefinitionsHandler}
          sentence={sentence.join("")}/>
        <Backdrop show={backdrop}/>
        <Result 
          message={message} 
          classColor={classColor}
          restart={restart} 
          sentence={sentence.join("")}
          resultClicked={showDefinitionsHandler}
        />
      </>

    )
  }

  return (
    <div className={classes.HangmanMain}>
      <Header text="the hangman game"/>
      <Hearts />
      {sentence.length > 0 ? view : <Spinner />}
    </div>
  );

}


export default hangmanMain;
