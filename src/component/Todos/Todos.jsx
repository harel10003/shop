import './Todos.css';
import Todo from '../Todo/Todo';
import { useEffect, useState, useRef } from 'react';

function Todos() {
	let newTodo = '';
	const [todos, setTodos] = useState([
		// { todo: 'clean', id: 1, complete: false },
		// { todo: 'to call', id: 2, complete: true },
		// { todo: 'to work', id: 3, complete: false },
	]);

	const inputRef = useRef(null);
	// if (inputRef && inputRef.current) inputRef.current.focus();

	useEffect(() => {
		inputRef.current.focus();
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((res) => {
				return res.json();
			})
			.then((Todos) => setTodos(Todos));
	}, []);

	const removeTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

	const completeTodo = (id) =>
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	return (
		<>
			<input
				ref={inputRef}
				onChange={(e) => (newTodo = e.target.value)}
				type="text"
				placeholder="new todo 😄?"
			/>
			<button
				onClick={() => {
					setTodos([
						...todos,
						{
							todo: newTodo,
							id: todos.length + 1,
							complete: false,
						},
					]);
				}}
			>
				Add Todo
			</button>
			{todos.map((todo) => (
				<h1 key={todo.id}>
					<Todo
						id={todo.id}
						title={todo.title}
						completed={todo.completed}
						onRemove={removeTodo}
						onComplete={completeTodo}
					/>
				</h1>
			))}
		</>
	);
}
export default Todos;
