import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = () => (
    <div className={classes.Loader} data-testid='loader'></div>
);

export default Spinner;