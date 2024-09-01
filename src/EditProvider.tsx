import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface EditTableStateContextType {
	editStates: { [key: string]: boolean };
	toggleEditState: (id: string | string[]) => void;
	setEditState: (id: string | string[], state: boolean) => void;
}

const EditTableStateContext = createContext<
	EditTableStateContextType | undefined
>(undefined);

export const useEditTableStateProvider = () => {
	const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

	const toggleEditState = (id: string | string[]) => {
		// Проверяем, является ли id строкой или массивом
		if (typeof id === 'string') {
			setEditStates(prev => ({
				...prev,
				[id]: !prev[id],
			}));
		} else if (Array.isArray(id)) {
			// Для массива элементов проходимся по каждому элементу
			setEditStates(prev => {
				const newStates = { ...prev };
				id.forEach(id => {
					newStates[id] = !prev[id];
				});
				return newStates;
			});
		}
	};

	const setEditState = (id: string | string[], state: boolean) => {
		// Проверяем, является ли id строкой или массивом
		if (typeof id === 'string') {
			setEditStates(prev => ({
				...prev,
				[id]: state,
			}));
		} else if (Array.isArray(id)) {
			// Для массива элементов проходимся по каждому элементу
			setEditStates(prev => {
				const newStates = { ...prev };
				id.forEach(id => {
					newStates[id] = state;
				});
				return newStates;
			});
		}
	};

	return { editStates, toggleEditState, setEditState };
};

export const EditTableStateProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const providerValue = useEditTableStateProvider();

	return (
		<EditTableStateContext.Provider value={providerValue}>
			{children}
		</EditTableStateContext.Provider>
	);
};

export const useEditTableState = () => {
	const context = useContext(EditTableStateContext);
	if (!context) {
		throw new Error(
			'useEditTableState must be used within an EditTableStateProvider'
		);
	}
	return context;
};
