import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { useEditTableState } from './EditProvider';

interface EditTableTextProps {
	id: string;
	initialText?: string;
	children?: ReactNode;
	[key: string]: any; // Чтобы принять любые HTML атрибуты
}

const EditTableTextBase: FC<EditTableTextProps> = ({
	id,
	initialText = '',
	children,
	...restProps // Добавляем остальные свойства, чтобы они передавались в элементы
}) => {
	const { editStates } = useEditTableState();
	const [text, setText] = useState(initialText || (children as string));

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setText(e.target.value);

	return editStates[id] ? (
		<textarea
			value={text}
			onChange={handleChange}
			{...restProps} // Применяем остальные свойства к textarea
		/>
	) : (
		<span {...restProps}>{text}</span> // Применяем остальные свойства к span
	);
};

type EditTableTextComponent = typeof EditTableTextBase & {
	[key: string]: FC<EditTableTextProps>;
};

const EditTableText: EditTableTextComponent =
	EditTableTextBase as EditTableTextComponent;

const tags = ['p', 'h1', 'h2', 'h3', 'span', 'div'];

tags.forEach(tag => {
	EditTableText[tag] = ({
		id,
		initialText = '',
		children,
		...restProps
	}: EditTableTextProps) => {
		const { editStates } = useEditTableState();
		const [text, setText] = useState(initialText || (children as string));

		const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
			setText(e.target.value);

		const Tag = tag as keyof JSX.IntrinsicElements;

		return editStates[id] ? (
			<textarea
				value={text}
				onChange={handleChange}
				{...restProps} // Применяем остальные свойства к textarea
			/>
		) : (
			<Tag {...restProps}>{text}</Tag> // Применяем остальные свойства к тегу
		);
	};
});

export default EditTableText;
