import { TextField } from '@mui/material';
import { useContext } from 'react';
import shopContext from '../component/context/ShopConetext';
import GridData from '../component/GridData';

function Admin() {
	const { productsList, setProductsList, setFilterdList } =
		useContext(shopContext);

	let newProduct = {
		title: '',
		description: '',
		category: '',
		image: '',
		price: '',
		rating: {
			rate: '',
			count: '',
		},
	};
	const post = () => {
		fetch('/api/products', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: newProduct.title,
				description: newProduct.description,
				category: newProduct.category,
				image: newProduct.image,
				price: newProduct.price,
				rating: {
					rate: newProduct.rating.rate,
					count: newProduct.rating.count,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => setProductsList([data, ...productsList]));
	};

	//לסדר שיקבל נתונים מלאים ונכונים וכמובן תצוגה
	// const put = (id) => {
	// 	fetch('/api/products/id', {
	// 		method: 'PUT',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			title: 'test',
	// 			description: newProduct.description,
	// 			category: newProduct.category,
	// 			image: newProduct.image,
	// 			price: newProduct.price,
	// 			rating: {
	// 				rate: newProduct.rating.rate,
	// 				count: newProduct.rating.count,
	// 			},
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setProductsList([data, ...productsList]));
	// };
	//הפעלת עריכה
	// put('6242af254e92eb01c9ecd353');
	// const deleted = (id) => {
	// 	fetch(`/api/products/${id}`, {
	// 		method: 'delete',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			title: 'test',
	// 			description: newProduct.description,
	// 			category: newProduct.category,
	// 			image: newProduct.image,
	// 			price: newProduct.price,
	// 			rating: {
	// 				rate: newProduct.rating.rate,
	// 				count: newProduct.rating.count,
	// 			},
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setProductsList([data, ...productsList]));
	// };
	// הפעלת מחיקה
	// deleted('6242af254e92eb01c9ecd353');

	// const removeTodo = (id) => {
	// 	setTodos(todos.filter((todo) => todo.id !== id));
	//   };

	//   const toggleTodo = (id) => {
	// 	setTodos(
	// 	  todos.map((todo) =>
	// 		todo.id === id ? { ...todo, completed: !todo.completed } : todo
	// 	  )
	// 	);
	//   };

	// title, description, category, image, price, rating
	return (
		<>
			<div>new product</div>
			<TextField
				onChange={(e) => (newProduct.title = e.target.value)}
				labal="New title"
				placeholder="New title"
			/>
			<TextField
				onChange={(e) => (newProduct.description = e.target.value)}
				labal="New description"
				placeholder="New description"
			/>
			<TextField
				onChange={(e) => (newProduct.category = e.target.value)}
				labal="New category"
				placeholder="New category"
			/>
			<TextField
				onChange={(e) => (newProduct.image = e.target.value)}
				labal="New image"
				placeholder="New image"
			/>
			<TextField
				onChange={(e) => (newProduct.price = e.target.value)}
				labal="New price"
				placeholder="New price"
			/>
			<TextField
				onChange={(e) => (newProduct.rating.rate = e.target.value)}
				labal="New rate"
				placeholder="New rate"
			/>
			<TextField
				onChange={(e) => (newProduct.rating.count = e.target.value)}
				labal="New count"
				placeholder="New count"
			/>

			<button onClick={() => post()}>add product</button>

			<GridData />
		</>
	);
}

export default Admin;
