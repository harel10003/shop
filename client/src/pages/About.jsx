import { TextField } from '@mui/material';

function About({ productsList, setProductsList, setFilterdList, PriceCheck }) {
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

			<button
				onClick={() => {
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
						.then((data) =>
							setProductsList([data, ...productsList])
						);
				}}
			>
				add product
			</button>
		</>
	);
}

export default About;
