import React, {memo} from 'react';
import classes from './Reset.module.scss';

const reset = (props: {clickHandle: () => void}) => {
    return (
        <button type="button" className={classes.Reset} onClick={props.clickHandle}>Reset</button>
    );
};

export default memo(reset);