import React, {createRef, memo} from 'react';
import classes from './Letter.module.scss';

const Letter = (props: {value: string, onClick: (letterBtn: HTMLButtonElement | null) => void}) => {
    let letterBtn = createRef<HTMLButtonElement>();

    return (
        <button
            className={classes.Letter} 
            ref={letterBtn} 
            onClick={() => {props.onClick(letterBtn.current)}}
            data-testid='letter'
            data-value={props.value.toLowerCase()}>
                {props.value}
        </button>
    );
};

export default memo(Letter);