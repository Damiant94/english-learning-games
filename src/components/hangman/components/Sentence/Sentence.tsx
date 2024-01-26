import React, {memo} from 'react';
import classes from './Sentence.module.scss';

const Sentence = (props: {currentSentence: string}) => {    
    return (
        <div className={classes.Sentence} data-testid='sentence'>{props.currentSentence}</div>
    );
};

export default memo(Sentence);