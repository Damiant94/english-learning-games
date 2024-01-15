import React, {useEffect, useState} from 'react';
import Header from '../shared/Header/Header';
import Spinner from '../shared/Spinner/Spinner';

import classes from './QuizMain.module.scss';

import axios from 'axios';

import words from '../../utils/js/words';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const quizMain = () => {

  const view = 'Quiz'

  return (
    <div className={classes.QuizMain}>
      <Header text="quiz"/>
      <Spinner />
    </div>
  );

}


export default quizMain;
