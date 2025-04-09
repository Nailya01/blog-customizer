import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useState, FormEvent, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (date: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(defaultArticle);
	const ref = useRef<HTMLFormElement | null>(null);

	useClose({
		isFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: ref,
	});

	function submitSidebar(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(articleParams);
	}

	function resetSidebar() {
		setArticleParams(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function handleToggleForm() {
		setIsFormOpen((form) => !form);
	}

	function handleFontFamilyOption(value: OptionType) {
		setArticleParams({ ...articleParams, fontFamilyOption: value });
	}

	function handleFontSizeOptions(value: OptionType) {
		setArticleParams({ ...articleParams, fontSizeOption: value });
	}

	function handleFontColorOptions(value: OptionType) {
		setArticleParams({ ...articleParams, fontColor: value });
	}

	function handleBackgroundColorOptions(value: OptionType) {
		setArticleParams({ ...articleParams, backgroundColor: value });
	}

	function handleContentWidthOptions(value: OptionType) {
		setArticleParams({ ...articleParams, contentWidth: value });
	}

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={submitSidebar}
					onReset={resetSidebar}
					ref={ref}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={articleParams.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFontFamilyOption}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
						onChange={handleFontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={articleParams.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFontColorOptions}
					/>
					<Separator />
					<Select
						selected={articleParams.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleBackgroundColorOptions}
					/>
					<Select
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleContentWidthOptions}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
