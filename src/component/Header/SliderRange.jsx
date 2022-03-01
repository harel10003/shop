import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useContext, useState } from 'react';
import ShopContext from '../context/ShopConetext';

function RangeSlider() {
	// debugger;
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
	] = useContext(ShopContext);

	return (
		<Box sx={{ width: 200 }}>
			{minP}-{maxP}
			<Slider
				value={val}
				onChange={updataRange}
				aria-valuemax="10000"
				// getAriaLabel="filter price"
				valueLabelDisplay="auto"
				color="primary"
				min={0}
				max={2000}
				// min={minP}
				// max={maxP}
				//   getAriaValueText={valuetext}
			/>
		</Box>
	);
}

export default RangeSlider;
