import React, {memo} from 'react';
import classes from './Sentence.module.scss';

const sentence = (props: {currentSentence: string}) => {    
    return (
        <div className={classes.Sentence}>{props.currentSentence}</div>
    );
};

export default memo(sentence);