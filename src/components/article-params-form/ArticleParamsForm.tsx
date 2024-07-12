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

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const handleToggleSideBarState = (): void => {
		setIsMenuOpen(!isMenuOpen);
	};

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

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
			isMenuOpen &&
			rootRef.current &&
			!rootRef.current.contains(targetNode) &&
			!isInsideSelect(targetNode)
		) {
			handleToggleSideBarState();
		}
	};

	const handleClickEscClose = (evt: KeyboardEvent) => {
		if (isMenuOpen && evt.key === 'Escape') {
			handleToggleSideBarState();
		}
		if (!isMenuOpen) {
			return;
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutsideClose);
		document.addEventListener('keydown', handleClickEscClose);

		return () => {
			document.removeEventListener('click', handleClickOutsideClose);
			document.removeEventListener('keydown', handleClickEscClose);
		};
	}, [isMenuOpen]);

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton
					isOpen={isMenuOpen}
					toggleSideBar={handleToggleSideBarState}
				/>
				<aside
					className={clsx({
						[styles.container]: true,
						[styles.container_open]: isMenuOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleChangePageState}
						onReset={handleResetPageState}>
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
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
