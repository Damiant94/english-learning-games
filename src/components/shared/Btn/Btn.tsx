import React, { memo } from 'react';
import styles from './Btn.module.scss';
import Answered from '@/utils/interfaces/Answered';

const Btn = (props: { text: string, clickHandle: () => void, isUsed?: boolean, status?: Answered }) => {
	return (
		<div 
			onClick={props.clickHandle}
			className={`${styles.Btn} ${props.isUsed && styles.Disabled} ${!props.isUsed && props.status !== Answered.NOT_ANSWERED && props.status && styles.Hidden}`}
			data-testid='btn'>
				{props.text}
		</div>
	);
};

export default memo(Btn);