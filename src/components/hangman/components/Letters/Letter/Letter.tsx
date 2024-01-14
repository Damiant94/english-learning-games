import React, {createRef, memo} from 'react';
import classes from './Letter.module.scss';

const letter = (props: {value: string, onClick: (letterBtn: HTMLButtonElement | null) => void}) => {
    let letterBtn = createRef<HTMLButtonElement>();

    return (
        <button
            className={classes.Letter} 
            ref={letterBtn} 
            onClick={() => {props.onClick(letterBtn.current)}}>
                {props.value}
        </button>
    );
};

export default memo(letter);