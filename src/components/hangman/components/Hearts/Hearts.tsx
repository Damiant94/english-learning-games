import React, {memo} from 'react';
import classes from './Hearts.module.scss';
import Heart from './Heart/Heart';

const Hearts = () => {
    const heartsDivs = [];

    for (const i of [...Array(9).keys()]) {
        heartsDivs.push(<Heart key={i} data={i+1}/>);
    }

    return (
        <div className={classes.Hearts} data-testid='hearts'>
            {heartsDivs}
        </div>
    );
};

export default memo(Hearts);