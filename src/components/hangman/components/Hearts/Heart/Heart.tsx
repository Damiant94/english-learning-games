import React, { memo } from 'react';
import classes from './Heart.module.scss';
import Image from 'next/image';


const Heart = (props: { data: number }) => {
    return (
        <div className={classes.Heart} data-heart={props.data}>
            <Image src="heart-full.svg" alt="Heart-full" width={18} height={18} />
            <Image src="heart-empty.svg" alt="Heart-empty" width={18} height={18} />
        </div>
    );
};

export default memo(Heart);