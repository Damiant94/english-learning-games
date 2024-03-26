import React, { memo, useContext } from 'react';
import classes from './Result.module.scss';
import { BackdropContext, SentenceContext } from '../../Hangman';

const Result = (props: { message: string, restart: () => void, classColor: string }) => {

    const sentence = useContext(SentenceContext)
    const { setIsBackdrop } = useContext(BackdropContext)

    const showDefinitionsHandler = () => {
        setIsBackdrop(true);
    };

    return (
        <div className={classes.Result} data-testid='result'>
            <p className={classes[props.classColor]} data-testid={props.classColor}>{props.message}</p>
            <p>Correct answer:</p>
            <p onClick={showDefinitionsHandler}>{sentence}</p>
            <button type="button" onClick={props.restart}>Try again</button>
        </div>
    );
};

export default memo(Result);