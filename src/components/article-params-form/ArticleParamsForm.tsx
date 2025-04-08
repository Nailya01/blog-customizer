import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useState, useEffect, FormEvent, useRef } from 'react';
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

type TUseClose = {
	form: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ form, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!form) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [form, onClose, rootRef]);
}

type ArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (date: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: ArticleParamsFormProps) => {
	const [form, setForm] = useState(false);
	const [state, setState] = useState(defaultArticle);
	const ref = useRef<HTMLFormElement | null>(null);

	useClose({
		form,
		onClose: () => setForm(false),
		rootRef: ref,
	});

	function submitSidebar(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(state);
	}

	function resetSidebar() {
		setState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function handleToggleForm() {
		setForm((form) => !form);
	}

	function handleFontFamilyOption(value: OptionType) {
		setState({ ...state, fontFamilyOption: value });
	}

	function handleFontSizeOptions(value: OptionType) {
		setState({ ...state, fontSizeOption: value });
	}

	function handleFontColorOptions(value: OptionType) {
		setState({ ...state, fontColor: value });
	}

	function handleBackgroundColorOptions(value: OptionType) {
		setState({ ...state, backgroundColor: value });
	}

	function handleContentWidthOptions(value: OptionType) {
		setState({ ...state, contentWidth: value });
	}

	return (
		<>
			<ArrowButton isOpen={form} onClick={handleToggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				<form
					className={styles.form}
					onSubmit={submitSidebar}
					onReset={resetSidebar}
					ref={ref}>
					<Text
						as='h1'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFontFamilyOption}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleFontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFontColorOptions}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleBackgroundColorOptions}
					/>
					<Select
						selected={state.contentWidth}
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
