import React, {memo} from 'react';
import classes from './Letters.module.scss';
import Letter from './Letter/Letter';

const Letters = (props: {clickHandle: (clickedLetter: HTMLButtonElement | null) => void}) => {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("").map(letter => {
        return (
            <Letter 
                key={letter}
                onClick={props.clickHandle}
                value={letter}
            />
        )
    });

    return (
        <div className={classes.Letters}>
            {allLetters}
        </div>
    );
};

export default memo(Letters);