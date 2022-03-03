import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import ShopContext from '../context/ShopConetext';
import OrderProduct from '../Product/OrderProduct';
import { Avatar, Stack } from '@mui/material';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

function Cart() {
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
	] = useContext(ShopContext);

	const cartIndex = cartList
		.map((id) => id)
		.filter((value, index, array) => array.indexOf(value) === index);

	const count = (item) => cartList.filter((p) => p === item);
	// const thisProduct = (id) => productsList.filter((p) => p.id === id)[0];
	// let sumTotal = 0;
	// const TotalPrice = () => {
	// 	cartList.forEach((p) => (sumTotal += thisProduct(p).price));
	// 	return sumTotal;
	// };

	return (
		<div>
			{/* <AiOutlineShoppingCart />
			{cartList.length} */}
			<div style={{ display: 'inline', margin: ' 0 10px' }}>
				{TotalPrice()}$
			</div>
			<IconButton aria-label="cart">
				<StyledBadge badgeContent={cartList.length} color="secondary">
					<ShoppingCartIcon />
				</StyledBadge>
			</IconButton>
			<ul>
				{cartIndex.map((item, index) => {
					return (
						<li key={item}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									border: '1px solid #f6f6f6',
									borderRadius: '10px',
									margin: '10px',
									padding: '10px',
									background: 'gray',
									color: 'white',
								}}
							>
								<div
									className="leftimg"
									style={{ padding: '5px' }}
								>
									<img
										src={thisProduct(item).image}
										alt={thisProduct(item).title}
										style={{
											width: '100px',
											borderRadius: '10px',
										}}
									/>
								</div>
								<div
									className="righinfo"
									style={{ padding: '5px' }}
								>
									<span>{thisProduct(item).title}</span>

									<span>
										{count(item).length *
											thisProduct(item).price +
											'$'}
									</span>
									<div>{count(item).length + ' units'}</div>

									<OrderProduct
										image={thisProduct(item).image}
										title={thisProduct(item).title}
										price={thisProduct(item).price}
										id={thisProduct(item).id}
									/>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Cart;
