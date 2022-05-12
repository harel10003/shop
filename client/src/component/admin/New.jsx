import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
	useGridApiRef,
	DataGridPro,
	GridToolbarContainer,
	GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
	randomCreatedDate,
	randomTraderName,
	randomUpdatedDate,
	randomId,
} from '@mui/x-data-grid-generator';
import shopContext from '../context/ShopConetext';

// const { productsList, setFilterdList } = useContext(shopContext);

// const rows = productsList?.map((p, index) => {
// 	// const rowData = products?.map((p, index) => {
// 	return {
// 		id: p?._id,
// 		title: p?.title,
// 		description: p?.description,
// 		category: p?.category,
// 		image: p?.image,
// 		price: p?.price,
// 		index,
// 	};
// });

const rows = fetch('/api/products').then((res) => {
	return res.json();
});
// [
// 	{
// 		id: randomId(),
// 		name: randomTraderName(),
// 		age: 25,
// 		dateCreated: randomCreatedDate(),
// 		lastLogin: randomUpdatedDate(),
// 	},
// 	{
// 		id: randomId(),
// 		name: randomTraderName(),
// 		age: 36,
// 		dateCreated: randomCreatedDate(),
// 		lastLogin: randomUpdatedDate(),
// 	},
// 	{
// 		id: randomId(),
// 		name: randomTraderName(),
// 		age: 19,
// 		dateCreated: randomCreatedDate(),
// 		lastLogin: randomUpdatedDate(),
// 	},
// 	{
// 		id: randomId(),
// 		name: randomTraderName(),
// 		age: 28,
// 		dateCreated: randomCreatedDate(),
// 		lastLogin: randomUpdatedDate(),
// 	},
// 	{
// 		id: randomId(),
// 		name: randomTraderName(),
// 		age: 23,
// 		dateCreated: randomCreatedDate(),
// 		lastLogin: randomUpdatedDate(),
// 	},
// ];

function EditToolbar(props) {
	const { apiRef } = props;

	const handleClick = (params) => {
		const id = params.id;
		apiRef.current.updateRows([{ id, isNew: true }]);
		apiRef.current.startRowEditMode({ id });

		// Wait for the grid to render with the new row
		setTimeout(() => {
			apiRef.current.scrollToIndexes({
				rowIndex: apiRef.current.getRowsCount() - 1,
			});

			apiRef.current.setCellFocus(id, 'title');
		});
	};

	return (
		<GridToolbarContainer>
			<Button
				color="primary"
				startIcon={<AddIcon />}
				onClick={handleClick}
			>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	apiRef: PropTypes.shape({
		current: PropTypes.object.isRequired,
	}).isRequired,
};

export default function FullFeaturedCrudGrid() {
	const apiRef = useGridApiRef();

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleEditClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.startRowEditMode({ id });
	};

	const handleSaveClick = (id) => async (event) => {
		event.stopPropagation();
		await apiRef.current.stopRowEditMode({ id });
	};

	const handleDeleteClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.updateRows([{ id, _action: 'delete' }]);
	};

	const handleCancelClick = (id) => async (event) => {
		event.stopPropagation();
		await apiRef.current.stopRowEditMode({ id, ignoreModifications: true });

		const row = apiRef.current.getRow(id);
		if (row.isNew) {
			apiRef.current.updateRows([{ id, _action: 'delete' }]);
		}
	};

	const processRowUpdate = async (newRow) => {
		return { ...newRow, isNew: false };
	};

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
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							onClick={handleSaveClick(id)}
							color="primary"
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Box
			sx={{
				height: 500,
				width: '100%',
				'& .actions': {
					color: 'text.secondary',
				},
				'& .textPrimary': {
					color: 'text.primary',
				},
			}}
		>
			<DataGridPro
				rows={rows}
				columns={columns}
				apiRef={apiRef}
				editMode="row"
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				components={{
					Toolbar: EditToolbar,
				}}
				componentsProps={{
					toolbar: { apiRef },
				}}
				experimentalFeatures={{ newEditingApi: true }}
			/>
		</Box>
	);
}
