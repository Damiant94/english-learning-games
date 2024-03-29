import React, { createContext, useEffect, useState } from 'react';
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

export const DefinitionsContext = createContext<{
  definitions: string[],
  currentDefinition: string,
  setCurrentDefinition: React.Dispatch<React.SetStateAction<string>>
}>({
  definitions: [""],
  currentDefinition: "",
  setCurrentDefinition: () => { }
})

export const SentenceContext = createContext([""])
export const BackdropContext = createContext<{
  isBackdrop: boolean,
  setIsBackdrop: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isBackdrop: false,
  setIsBackdrop: () => { }
})


const Hangman = () => {

  const [sentence, setSentence] = useState<string[]>([]);
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [currentDefinition, setCurrentDefinition] = useState<string>('');
  const [lives, setLives] = useState(9);
  const [status, setStatus] = useState<Status>(Status.PROGRESS);
  const [isBackdrop, setIsBackdrop] = useState(false);

  const setFreshState = () => {
    setSentence([]);
    setCurrentSentence('');
    setDefinitions([]);
    setCurrentDefinition('');
    setLives(9);
    setStatus(Status.PROGRESS);
    setIsBackdrop(false);
  };

  const checkIfIsLetter = (letter: string) => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letter.toUpperCase());
  }

  const handleKeydown = (event: globalThis.KeyboardEvent) => {
    if (checkIfIsLetter(event.key)) {
      const letter = document.querySelector(`button[data-value="${event.key}"]`) as HTMLButtonElement;
      if (!letter.classList.contains(stylesLetter.Correct) && !letter.classList.contains(stylesLetter.Wrong)) {
        letterClickHandler(letter);
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.removeEventListener('keydown', handleKeydown)
    }
  })

  const setNewSentence = (sentence: string[]) => {
    let currentSentence = "";
    for (const letter of sentence) {
      if (checkIfIsLetter(letter)) {
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

  const correctLetterHandle = (clickedLetter: HTMLButtonElement | null) => {
    clickedLetter!.classList.add(stylesLetter.Correct);
    let newCurrentSentence = "";
    for (const letter of sentence) {
      if (letter === clickedLetter!.innerHTML || letter === " " || currentSentence.includes(letter)) {
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

  const wrongLetterHandle = (clickedLetter: HTMLButtonElement | null) => {
    clickedLetter!.classList.add(stylesLetter.Wrong);
    document.querySelector(`[data-heart="${lives}"]`)!.className = stylesHeart.HeartLost;

    if (lives === 1) {
      setStatus(Status.LOSE);
    }
    setLives(prevState => prevState - 1)
  };

  const letterClickHandler = (clickedLetter: HTMLButtonElement | null) => {
    clickedLetter!.disabled = true;
    if (sentence.includes(clickedLetter!.innerHTML)) {
      correctLetterHandle(clickedLetter);
    } else {
      wrongLetterHandle(clickedLetter);
    }
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
        <Translation />
        <Backdrop />
        <Result
          message={message}
          classColor={classColor}
          restart={restart}
        />
      </>
    )
  }

  return (
    <BackdropContext.Provider value={{ isBackdrop, setIsBackdrop }}>
      <SentenceContext.Provider value={sentence}>
        <DefinitionsContext.Provider value={{ definitions, currentDefinition, setCurrentDefinition }}>
          <Layout>
            <div className={styles.HangmanMain} data-testid='hangman'>
              <Header text="the hangman game" />
              <Hearts />
              {sentence.length > 0 ? view : <Spinner />}
            </div>
          </Layout>
        </DefinitionsContext.Provider>
      </SentenceContext.Provider>
    </BackdropContext.Provider>
  );
}


export default Hangman;
