import React, {memo} from 'react';
import classes from './Heart.module.scss';


const heart = (props: {data: number}) => {
    return (
        <div className={classes.Heart} data-heart={props.data}>
            <img src="heart-full.svg" alt="Heart-full" />
            <img src="heart-empty.svg" alt="Heart-empty" />
        </div>
    );
};

export default memo(heart);