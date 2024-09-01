# React Text Admin

This library allows you to edit text inside HTML elements.

## Getting Started

- Install the library by running: npm i react-text-admin;

- Export and wrap your application with the EditTableStateProvider component:

```js
import { EditTableStateProvider } from 'react-text-admin'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<EditTableStateProvider>
		<App />
	</EditTableStateProvider>
);

```

## Usage

To make the text within an HTML element editTable, you need to export the EditTableText component from the library and place it in front of the element using dot notation. After that, you should assign an id to it for element identification:

```js
import { EditTableText } from 'react-text-admin';

const App = () => {
	return (
		<>
			<EditTableText.h1 id='1' className={styles.test}>
				test text
			</EditTableText.h1>
		</>
	);
};
```

To enable text editing, you need to export the useEditTableState hook and retrieve either the toggleEditState or setEditState function from it. Both functions accept the element ID(s) as a string or an array of strings:

```js
import { EditTableText, useEditTableState } from 'react-text-admin';

const App = () => {
	const { toggleEditState, editStates, setEditState } = useEditTableState();

	return (
		<>
			<EditTableText.h1 id='1' className={styles.test}>
				test text
			</EditTableText.h1>
			<EditTableText.h1 id='2' className={styles.test}>
				test text
			</EditTableText.h1>
			<button
				style={{ marginTop: '20px' }}
				onClick={() => toggleEditState('1')}
			>
				test button toggle
			</button>
			<button
				style={{ marginTop: '20px' }}
				onClick={() => toggleEditState(['1', '2'])}
			>
				test button mass toggle
			</button>
			<button
				style={{ marginTop: '20px' }}
				onClick={() => setEditState('1', true)}
			>
				test button
			</button>
			<button
				style={{ marginTop: '20px' }}
				onClick={() => setEditState(['1', '2'], false)}
			>
				test button mass
			</button>
		</>
	);
};
```

The difference between toggleEditState and setEditState is that with setEditState, you explicitly specify the edit state for the elements.

The editStates object stores the state of each element, where the key is the id value, and the value is the boolean state of the element.
