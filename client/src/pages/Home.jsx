import Products from '../component/Products/Products';
import SliderRange from '../component/Header/SliderRange';
import ShopContext from '../component/context/ShopConetext';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useContext, useEffect, useState } from 'react';
// import { Search } from '@mui/icons-material';
import ColorTextFields from '../component/Header/ColorTextFields';

function Home() {
	const [category, setCategory] = useState('all');

	const handleChange = (e) => setCategory(e.target.value);

	const { filteredList, categories, filterCategory } =
		useContext(ShopContext);
	return (
		<div>
			<div
				className="home"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{/* {minPrice}-{maxPrice}-{catgoryNow} */}
				<div style={{ padding: '15px 0 0 0' }}>
					<SliderRange />
				</div>
				<div style={{ padding: '15px 0 0 0' }}>
					<ColorTextFields />
				</div>

				<Box sx={{ minWidth: 150 }}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">
							Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={category}
							label="Filter by:"
							onChange={(e) => {
								filterCategory(e.target.value);
								handleChange(e);
							}}
						>
							<MenuItem value="all">ALL</MenuItem>
							{categories.map((category) => (
								<MenuItem key={category} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				{/* <div className="sort">
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
				</div> */}
			</div>
			<Products listProducts={filteredList} />
		</div>
	);
}

export default Home;
