import React, {memo} from 'react';
import classes from './Result.module.scss';

const Result = (props: {message: string, sentence: string, restart: () => void, classColor: string, resultClicked: () => void}) => {

    return (
        <div className={classes.Result}>
            <p className={classes[props.classColor]}>{props.message}</p>
            <p>Correct answer:</p> 
            <p onClick={props.resultClicked}>{props.sentence}</p>
            <button type="button" onClick={props.restart}>Try again</button>
        </div>
    );
};

export default memo(Result);