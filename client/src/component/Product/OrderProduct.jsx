import React, { useContext } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import shopContext from '../context/ShopConetext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function OrderProduct({ image, title, price, _id }) {
	const [
		cartList,
		setCartlist,
		productsList,
		minPrice,
		setMinPrice,
		maxPrice,
		setMaxPrice,
		updataRange,
		setVal,
		val,
		minP,
		maxP,
		thisProduct,
		sumTotal,
		TotalPrice,
		catgoryNow,
		filteredList,
		showMinus,
		removeProduct,
	] = useContext(shopContext);
	const count = (item) => cartList.filter((p) => p === item);
	return (
		<div style={{ margin: '10px 0 0 0 ' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'left',

					'& > *': {
						m: 1,
					},
				}}
			>
				<ButtonGroup variant="text" aria-label="text button group">
					<AddCircleIcon
						sx={{ fontSize: 40, color: 'secondary' }}
						onClick={() => {
							setCartlist([_id, ...cartList]);
						}}
						style={{
							cursor: 'pointer',
							display:
								showMinus(_id) === 'none' ? 'inline' : 'none',
						}}
					/>
					<Button>
						<AiOutlinePlus
							onClick={() => {
								setCartlist([_id, ...cartList]);
							}}
							style={{
								cursor: 'pointer',
								display: showMinus(_id),
							}}
						/>
					</Button>
					<Button
						style={{ cursor: 'default', display: showMinus(_id) }}
					>
						{count(_id).length}
					</Button>
					<Button>
						<AiOutlineMinus
							style={{
								display: showMinus(_id),
								cursor: 'pointer',
							}}
							onClick={() => {
								removeProduct(_id);
							}}
						/>
					</Button>
				</ButtonGroup>
			</Box>
		</div>
	);
}

export default OrderProduct;
