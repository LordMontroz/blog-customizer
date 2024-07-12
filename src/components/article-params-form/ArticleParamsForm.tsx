import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

interface ArticleParamsFormProps {
	setPageData: (articleState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ setPageData }: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement | null>(null);

	const [isOpen, setIsOpen] = useState(false);

	const handleToggleSideBarState = (): void => {
		setIsOpen(!isOpen);
	};

	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleChangeDefaultArticleState = (option: OptionType, key: string) => {
		setArticleState({ ...articleState, [key]: option });
	};

	const handleChangePageState = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setPageData(articleState);
	};

	const handleResetPageState = () => {
		setPageData(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const isInsideSelect = (node: Node): boolean => {
		if (node.nodeName === 'LI') return true;
		if (node.parentNode) {
			return isInsideSelect(node.parentNode);
		}
		return false;
	};

	const handleClickOutsideClose = (evt: MouseEvent) => {
		const targetNode = evt.target as Node;
		if (
			isOpen &&
			rootRef.current &&
			!rootRef.current.contains(targetNode) &&
			!isInsideSelect(targetNode)
		) {
			handleToggleSideBarState();
		}
	};

	const handleClickEscClose = (evt: KeyboardEvent) => {
		if (isOpen && evt.key === 'Escape') {
			handleToggleSideBarState();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutsideClose);
		document.addEventListener('keydown', handleClickEscClose);

		return () => {
			document.removeEventListener('click', handleClickOutsideClose);
			document.removeEventListener('keydown', handleClickEscClose);
		};
	}, [isOpen]);

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isOpen} toggleSideBar={handleToggleSideBarState} />
				<aside
					className={clsx({
						[styles.container]: true,
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<h2 className={styles.subtitle}>Задайте параметры</h2>
						<Select
							title='шрифт'
							placeholder='Выберите шрифт'
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => {
								handleChangeDefaultArticleState(option, 'fontFamilyOption');
							}}
						/>
						<RadioGroup
							name='radio'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							title='размер шрифта'
							onChange={(option) => {
								handleChangeDefaultArticleState(option, 'fontSizeOption');
							}}
						/>
						<Select
							title='цвет шрифта'
							placeholder='Выберите цвет шрифта'
							selected={articleState.fontColor}
							options={fontColors}
							onChange={(option) => {
								handleChangeDefaultArticleState(option, 'fontColor');
							}}
						/>
						<Separator />
						<Select
							title='цвет фона'
							placeholder='Выберите цвет фона'
							selected={articleState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => {
								handleChangeDefaultArticleState(option, 'backgroundColor');
							}}
						/>
						<Select
							title='ширина контента'
							placeholder='Выберите ширину контента'
							selected={articleState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => {
								handleChangeDefaultArticleState(option, 'contentWidth');
							}}
						/>
						<div className={styles.bottomContainer}>
							<Button
								onClick={handleResetPageState}
								title='Сбросить'
								type='reset'
							/>
							<Button
								onClick={(evt: SyntheticEvent) => handleChangePageState(evt)}
								title='Применить'
								type='submit'
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
