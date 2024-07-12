import { Text } from 'components/text';

import styles from './Button.module.scss';
import { SyntheticEvent } from 'react';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: (evt: SyntheticEvent) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
