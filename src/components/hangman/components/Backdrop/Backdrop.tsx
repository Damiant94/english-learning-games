import React, { useContext } from 'react';
import classes from './Backdrop.module.scss';
import { BackdropContext } from '../../Hangman';

const Backdrop = () => {

    const { isBackdrop } = useContext(BackdropContext)

    const secondClassName = isBackdrop ? classes.visible : classes.hidden;
    const dataTestId = isBackdrop ? 'backdrop-visible' : 'backdrop-hidden'

    return (
        <div className={`${classes.Backdrop} ${secondClassName}`} data-testid={dataTestId}></div>
    )
};

export default Backdrop;