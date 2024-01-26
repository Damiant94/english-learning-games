import React from 'react';
import classes from './Backdrop.module.scss';

const Backdrop = (props: {show: boolean}) => {

    const secondClassName = props.show ? classes.visible : classes.hidden;
    const dataTestId = props.show ? 'backdrop-visible' : 'backdrop-hidden'

    return (
        <div className={`${classes.Backdrop} ${secondClassName}`} data-testid={dataTestId}></div>
    )
};

export default Backdrop;