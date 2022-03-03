import Products from '../component/Products/Products';
import SliderRange from '../component/Header/SliderRange';
import ShopContext from '../component/context/ShopConetext';
import { useContext, useEffect, useState } from 'react';

function Home() {
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
		categories,
		filterCategory,
	] = useContext(ShopContext);
	return (
		<div>
			<div
				className="home"
				style={{ display: 'flex', 'justify-content': 'space-between' }}
			>
				{/* {minPrice}-{maxPrice}-{catgoryNow} */}
				<SliderRange />
				<div className="sort">
					<div className="collection-sort">
						<label>Filter by:</label>
						<select
							onChange={(e) => filterCategory(e.target.value)}
						>
							<option>all</option>
							{categories.map((category) => (
								<option key={category}>{category}</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<Products listProducts={filteredList} />
		</div>
	);
}

export default Home;
