import React, {memo} from 'react';
import classes from './Header.module.scss';

const header = () => {
    return (
        <div className={classes.Header}>the hangman game</div>
    );
};

export default memo(header);