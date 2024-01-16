import React, { memo } from 'react';
import styles from './Btn.module.scss';

const btn = (props: { text: string, clickHandle: () => void }) => {
	return (
		<div onClick={props.clickHandle} className={styles.Btn}>
			{props.text}
		</div>
	);
};

export default memo(btn);