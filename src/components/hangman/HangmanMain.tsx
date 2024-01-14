import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import Hearts from './components/Hearts/Hearts';
import Sentence from './components/Sentence/Sentence';
import Letters from './components/Letters/Letters';
import Reset from './components/Reset/Reset';
import Result from './components/Result/Result';
import Spinner from './components/Spinner/Spinner';
import Backdrop from './components/Backdrop/Backdrop';
import Translation from './components/Translation/Translation';

import classes from './HangmanMain.module.scss';
import classesHeart from './components/Hearts/Heart/Heart.module.scss';
import classesLetter from './components/Letters/Letter/Letter.module.scss';

import axios from 'axios';

import words from '../../utils/js/words';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const HangmanMain = () => {

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

  const createSentence = () => {
    axios.get(randomWordUrl)
      .then(response => {
        const sentence = response.data[0].toUpperCase().split("");
        setNewSentence(sentence);
        // this.setSentence("GO-.".split(""));
        console.log("word taken from api");
      })
      .catch(() => {
        const sentence = words[Math.floor(Math.random() * words.length)].toUpperCase().split("");
        setNewSentence(sentence);
        console.log("word taken from frontend");
      });
  };

  interface Definitions {
    definition: string,
    synonyms: string[],
    antonyms: string[]
  }

  const setNewDefinitions = (word: string) => {
    const message = "Sorry, couldn't find a definition";
    axios.get(translationUrl + word)
      .then((response: any) => {
        const definitions: Definitions[] = response.data[0].meanings
          .reduce((acc: Definitions[], meaning: any) => {
            return acc.concat(meaning.definitions)
            }, [])
          .map((element: Definitions) => element.definition);
        if (definitions.length === 0) {
          // this.setState({definitions: [message], currentDefinition: message})
          setDefinitions([message]);
          setCurrentDefinition(message)
        }
        else {
          setDefinitions(definitions)
          setCurrentDefinition(definitions[0])
          // this.setState({definitions: definitions, currentDefinition: definitions[0]})
        }
      })
      .catch(() => {
        // this.setState({definitions: [message], currentDefinition: message});
        setDefinitions([message]);
        setCurrentDefinition(message);
      })
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
      console.log({definitions})
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
        <Reset clickHandle={restart} />
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
    <div className={classes.Game}>
      <Header />
      <Hearts />
      {sentence.length > 0 ? view : <Spinner />}
    </div>
  );

}


export default HangmanMain;
