import React, {memo} from 'react';
import classes from './Header.module.scss';

const Header = (props: {text: string}) => {
    return (
        <div className={classes.Header}>{props.text}</div>
    );
};

export default memo(Header);