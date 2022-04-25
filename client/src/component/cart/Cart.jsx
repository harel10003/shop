import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import ShopContext from '../context/ShopConetext';
import OrderProduct from '../Product/OrderProduct';
import { Avatar, Stack } from '@mui/material';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

function Cart() {
	const {
		cartList,
		thisProduct,
	} = useContext(ShopContext);

	const cartIndex = cartList
		.map((_id) => _id)
		.filter((value, index, array) => array.indexOf(value) === index);

	const count = (item) => cartList.filter((p) => p === item);
	// const thisProduct = (id) => productsList.filter((p) => p.id === id)[0];
	// let sumTotal = 0;
	// const TotalPrice = () => {
	// 	cartList.forEach((p) => (sumTotal += thisProduct(p).price));
	// 	return sumTotal;
	// };

	return (
		<ul>
			{cartIndex.map((item, index) => {
				return (
					<li
						key={item}
						style={{
							margin: '10px',
							boxShadow:
								'0 10px 20px rgb(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)',
						}}
					>
						<div
							style={{
								position: 'relative',
								display: 'flex',
								flexDirection: 'row',
								// border: '1px solid #f6f6f6',
								borderRadius: '10px',
								margin: '10px',
								padding: '10px',
								// background: 'wh',
								color: 'gray',
							}}
						>
							<div
								style={{
									fontSize: 18,
									maxWidth: 100,
								}}
							>
								{thisProduct(item).title}
							</div>
							<div className="leftimg" style={{ padding: '5px' }}>
								<img
									src={thisProduct(item).image}
									alt={thisProduct(item).title}
									style={{
										width: 50,
										borderRadius: '10px',
									}}
								/>
							</div>
							<div
								className="righinfo"
								style={{
									padding: '5px',
								}}
							>
								<div
									style={{
										alignDontent: 'space-around',
										justifycontent: ' center',
										flexDirection: 'column',
									}}
								>
									<div
										style={{
											// position: 'absolute',
											// bottom: '50px',
											// right: '0px',
											padding: '0 30px',
											fontSize: '20px',
										}}
									>
										{thisProduct(item).price + '$'}
									</div>
									{/* <span
										style={{
											position: 'absolute',
											top: '50px',
										}}
									>
										{count(item).length + ' units'}
									</span> */}
									<div
										style={
											{
												// position: 'absolute',
												// bottom: 0,
												// left: 100,
											}
										}
									>
										<OrderProduct
											image={thisProduct(item).image}
											title={thisProduct(item).title}
											price={thisProduct(item).price}
											_id={thisProduct(item)._id}
										/>
									</div>
								</div>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default Cart;
