import './Header.css';
import ShopContext from '../context/ShopConetext';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SliderRange from './SliderRange';
// import { useState } from 'react';

function Header({ list, onFilter }) {
	const [cartList, setCartlist, productsList] = useContext(ShopContext);
	const thisProduct = (id) => productsList.filter((p) => p.id === id)[0];
	let sumTotal = 0;
	const TotalPrice = () => {
		cartList.forEach((p) => (sumTotal += thisProduct(p).price));
		return sumTotal;
	};
	return (
		<nav className="product-filter">
			<h1>Jackets</h1>
			<br />
			<AiOutlineShoppingCart />
			{cartList.length}
			<br />
			{TotalPrice()}$
			<div className="sort">
				<div className="collection-sort">
					<label>Filter by:</label>
					<select onChange={(e) => onFilter(e.target.value)}>
						<option>all</option>
						{list.map((category) => (
							<option key={category}>{category}</option>
						))}
					</select>
				</div>
				{/* <SliderRange /> */}
				<div className="collection-sort">
					<label>Sort by:</label>
					<select>
						<option value="/">Featured</option>
						<option value="/">Best Selling</option>
						<option value="/">Alphabetically, A-Z</option>
						<option value="/">Alphabetically, Z-A</option>
						<option value="/">Price, low to high</option>
						<option value="/">Price, high to low</option>
						<option value="/">Date, new to old</option>
						<option value="/">Date, old to new</option>
					</select>
				</div>
			</div>
		</nav>
	);
}
export default Header;
