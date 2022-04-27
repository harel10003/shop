import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	DataGridPro,
	GridActionsCellItem,
	GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid-pro';
import { Alert } from '@mui/material';
import shopContext from './context/ShopConetext';

function GridData() {
	const [products, setProducts] = useState([]);
	const { productsList, setProductsList } = useContext(shopContext);

	// const fetchData = async () => {
	// 	try {
	// 		const res = await fetch('/api/products');
	// 		const data = await res.json();
	// 		setProducts(data);
	// 		console.log(data);
	// 	} catch (err) {}
	// };

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	const rowData = productsList?.map((p, index) => {
		// const rowData = products?.map((p, index) => {
		return {
			id: p?._id,
			title: p?.title,
			description: p?.description,
			category: p?.category,
			image: p?.image,
			price: p?.price,
			index,
		};
	});

	const columns = [
		{ field: 'title', headerName: 'Title', width: 180, editable: true },
		{ field: 'description', headerName: 'Description', editable: true },
		{ field: 'category', headerName: 'Category', editable: true },
		{ field: 'image', headerName: 'Image', editable: true },
		{ field: 'price', headerName: 'Price', type: 'number', editable: true },
		{
			field: 'actions',
			headerName: 'Actions',
			type: 'actions',
			width: 100,

			getActions: (params) => [
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={() => deleted(params.id, params.row.index)}
				/>,
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Edit"
					onClick={() =>
						update(
							params.id,
							params.row.title,
							params.row.description,
							params.row.category,
							params.row.image,
							params.row.price,
							params.row.index
						)
					}
				/>,
			],
		},
	];

	const update = (id, title, description, category, image, price, index) => {
		let temp = {
			__v: 0,
			_id: id,
			title,
			description,
			category,
			image,
			price,
		};
		let tempArr = productsList;
		tempArr[index] = temp;
		setProductsList([...tempArr]);
		fetch(`/api/products/${id}`, {
			method: 'put',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				description,
				category,
				image,
				price,
				// rating: {
				// 	rate: newProduct.rating.rate,
				// 	count: newProduct.rating.count,
				// },
			}),
		})
			.then((res) => res.json())
			.then((data) => alert('ok'));
		// debugger;
	};

	const deleted = (id, index) => {
		debugger;
		fetch(`/api/products/${id}`, {
			method: 'delete',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		alert(`${id} is clear`);

		let temp = productsList;
		temp.splice(index, 1);
		setProductsList([...temp]);
	};

	return (
		<div style={{ height: 650, width: '100%' }}>
			<DataGrid
				rows={rowData}
				columns={columns}
				experimentalFeatures={{ newEditingApi: true }}
				// checkboxSelection
				initialState={{
					pinnedColumns: {
						left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
						right: ['actions'],
					},
				}}
			/>
		</div>
	);
}
// מבנה המוצר
// let newProduct = {
// 	title: '',
// 	description: '',
// 	category: '',
// 	image: '',
// 	price: '',
// 	rating: {
// 		rate: '',
// 		count: '',
// 	},
// };

export default GridData;
