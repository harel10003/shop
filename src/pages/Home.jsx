import Products from '../component/Products/Products';
import SliderRange from '../component/Header/SliderRange';
import ShopContext from '../component/context/ShopConetext';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';

function Home() {
	const [category, setCategory] = React.useState('');

	const handleChange = (e) => {
		setCategory((e) => filterCategory(e.target.value));
	};

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
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				{/* {minPrice}-{maxPrice}-{catgoryNow} */}
				<SliderRange />

				{/* <FormControl sx={{ m: 1, minWidth: 80 }}>
					<InputLabel id="demo-simple-select-autowidth-label">
						Category
					</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={category}
						onChange={(e) => filterCategory(e.target.value)}
						autoWidth
						label="Age"
					>
						<MenuItem value="">
							<em>all</em>
						</MenuItem>
						{categories.map((category) => (
							<MenuItem key={category}>{category}</MenuItem>
						))}
					</Select>
				</FormControl> */}

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
