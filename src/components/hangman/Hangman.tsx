import React, { useEffect, useState } from 'react';
import Hearts from './components/Hearts/Hearts';
import Sentence from './components/Sentence/Sentence';
import Letters from './components/Letters/Letters';
import Result from './components/Result/Result';
import Backdrop from './components/Backdrop/Backdrop';
import Translation from './components/Translation/Translation';

import Btn from '../shared/Btn/Btn';
import Spinner from '../shared/Spinner/Spinner';
import Header from '../shared/Header/Header';

import styles from './Hangman.module.scss';
import stylesHeart from './components/Hearts/Heart/Heart.module.scss';
import stylesLetter from './components/Letters/Letter/Letter.module.scss';

import { getDefinitionsApi, getRandomWordApi } from '@/utils/api/api';
import Layout from '../shared/Layout/Layout';

enum Status {
  PROGRESS = 'progress',
  WIN = 'win',
  LOSE = 'lose'
}


const Hangman = () => {

  const [sentence, setSentence] = useState<string[]>([]);
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [definitions, setDefinitions] = useState<any>([]);
  const [currentDefinition, setCurrentDefinition] = useState<any>('');
  const [lives, setLives] = useState(9);
  const [status, setStatus] = useState<Status>(Status.PROGRESS);
  const [backdrop, setBackdrop] = useState(false);

  const setFreshState = () => {
    setSentence([]);
    setCurrentSentence('');
    setDefinitions([]);
    setCurrentDefinition('');
    setLives(9);
    setStatus(Status.PROGRESS);
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

    for (const button of document.querySelectorAll(`.${stylesLetter.Correct}, .${stylesLetter.Wrong}`) as NodeListOf<HTMLButtonElement>) {
      button.className = stylesLetter.Letter;
      button.disabled = false;
    }

    for (const heart of document.querySelectorAll(`.${stylesHeart.HeartLost}`)) {
      heart.className = stylesHeart.Heart;
    }
  };

  const correctLetterHandle = (clickedLetter: any) => {
    clickedLetter.classList.add(stylesLetter.Correct);
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
      setStatus(Status.WIN);
    }
  };

  const wrongLetterHandle = (clickedLetter: any) => {
    clickedLetter.classList.add(stylesLetter.Wrong);
    document.querySelector(`[data-heart="${lives}"]`)!.className = stylesHeart.HeartLost;

    if (lives === 1) {
      setStatus(Status.LOSE);
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

  let view;
  if (status === Status.PROGRESS) {
    view = (
      <>
        <Sentence currentSentence={currentSentence} />
        <Letters clickHandle={letterClickHandler} />
        <Btn clickHandle={restart} text="Reset" />
      </>
    );
  } else {
    let message, classColor;
    if (status === Status.WIN) {
      message = "You won!";
      classColor = "Win";
    } else if (status === Status.LOSE) {
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
          sentence={sentence.join("")} />
        <Backdrop show={backdrop} />
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
    <Layout>
      <div className={styles.HangmanMain}>
        <Header text="the hangman game" />
        <Hearts />
        {sentence.length > 0 ? view : <Spinner />}
      </div>
    </Layout>
  );
}


export default Hangman;
