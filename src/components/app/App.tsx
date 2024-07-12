import { CSSProperties, useState } from 'react';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [pageData, setPageData] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageData.fontFamilyOption.value,
					'--font-size': pageData.fontSizeOption.value,
					'--font-color': pageData.fontColor.value,
					'--container-width': pageData.contentWidth.value,
					'--bg-color': pageData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageData={setPageData} />
			<Article />
		</main>
	);
};
