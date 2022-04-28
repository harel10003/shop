import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import {
	DataGridPro,
	GridActionsCellItem,
	GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid-pro';

import shopContext from './context/ShopConetext';
import { Alert } from '@mui/material';

function GridData() {
	const { productsList, setFilterdList } = useContext(shopContext);

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
		{ field: 'title', headerName: 'Title', width: 250, editable: true },
		{
			field: 'description',
			headerName: 'Description',
			width: 200,
			editable: true,
		},
		{
			field: 'category',
			headerName: 'Category',
			width: 150,
			editable: true,
		},
		{ field: 'image', headerName: 'Image', editable: true },
		{ field: 'price', headerName: 'Price', type: 'number', editable: true },
		// {
		// 	field: 'rating.rate',
		// 	headerName: 'rating.rate',
		// 	type: 'number',
		// 	editable: true,
		// },
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
							// params.row.rating.rate,
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
		setFilterdList([...tempArr]);
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
		// .then((data) => toast.success('ok'));
	};

	const deleted = (id, index) => {
		fetch(`/api/products/${id}`, {
			method: 'delete',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		let temp = productsList;
		temp.splice(index, 1);
		setFilterdList([...temp]);
		toast.success(`${id} is clear`);
		<Alert severity="success">{id} is clear</Alert>;
		alert(`${id} is clear`);
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
