import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
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
			.then((data) => setFilterdList([data, ...productsList]));
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
			<div style={{ margin: ' 10px 0', fontSize: 25 }}>New product</div>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<div>
					<TextField
						onChange={(e) => (newProduct.title = e.target.value)}
						labal="New title"
						placeholder="New title"
						required
						id="outlined-required"
						label="New title"
					/>
					<TextField
						onChange={(e) =>
							(newProduct.description = e.target.value)
						}
						labal="New description"
						placeholder="New description"
						required
						id="outlined-required"
						label="New description"
					/>
				</div>
				<div>
					<TextField
						onChange={(e) => (newProduct.category = e.target.value)}
						labal="New category"
						placeholder="New category"
						required
						id="outlined-required"
						label="New category"
					/>
					<TextField
						onChange={(e) => (newProduct.image = e.target.value)}
						labal="New image"
						placeholder="New image"
						required
						id="outlined-required"
						label="New image"
					/>
				</div>
				<div>
					<TextField
						onChange={(e) => (newProduct.price = e.target.value)}
						labal="New price"
						placeholder="New price"
						required
						id="outlined-required"
						label="New price"
					/>
					{/* <TextField
						onChange={(e) =>
							(newProduct.rating.rate = e.target.value)
						}
						labal="New rate"
						placeholder="New rate"
						required
						id="outlined-required"
						label="New title"
					/> */}
					{/* <TextField
						onChange={(e) =>
							(newProduct.rating.count = e.target.value)
						}
						labal="New count"
						placeholder="New count"
						required
						id="outlined-required"
						label="New title"
					/> */}
					<Button
						variant="contained"
						style={{ margin: '10px 20px', padding: '12px 50px' }}
						onClick={() => post()}
					>
						Add Product
					</Button>
				</div>
			</Box>
			<div style={{ margin: ' 10px 0', fontSize: 25 }}>Edit Product</div>
			<GridData />
		</>
	);
}

export default Admin;
