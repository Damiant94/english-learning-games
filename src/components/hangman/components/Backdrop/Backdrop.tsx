import React from 'react';
import classes from './Backdrop.module.scss';

const backdrop = (props: {show: boolean}) => {

    const secondClassName = props.show ? classes.visible : classes.hidden;

    return (
        <div className={`${classes.Backdrop} ${secondClassName}`}></div>
    )
};

export default backdrop;