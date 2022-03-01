import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import ShopContext from '../context/ShopConetext';

function Cart() {
	const [cartList, setCartlist, productsList] = useContext(ShopContext);

	const cartIndex = cartList
		.map((id) => id)
		.filter((value, index, array) => array.indexOf(value) === index);

	const count = (item) => cartList.filter((p) => p === item);
	const thisProduct = (id) => productsList.filter((p) => p.id === id)[0];
	let sumTotal = 0;
	const TotalPrice = () => {
		cartList.forEach((p) => (sumTotal += thisProduct(p).price));
		return sumTotal;
	};

	return (
		<div>
			<AiOutlineShoppingCart />
			{cartList.length}
			<br />
			{TotalPrice()}$
			<ul>
				{cartIndex.map((item, index) => {
					return (
						<li key={item}>
							<table>
								<tbody>
									<tr>
										<td>
											<img
												src={thisProduct(item).image}
												width="25"
												alt=""
											/>
										</td>
										<td>{thisProduct(item).title}</td>
									</tr>
									<tr>
										<td>
											{count(item).length *
												productsList[item - 1].price +
												'$'}
										</td>
									</tr>
									<tr>
										<td>{count(item).length + ' units'}</td>
									</tr>
								</tbody>
							</table>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Cart;
