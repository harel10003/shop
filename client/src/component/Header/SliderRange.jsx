// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import { useContext } from 'react';
// import ShopContext from '../context/ShopConetext';

// import PropTypes from 'prop-types';

// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';

// function RangeSlider() {
// 	// debugger;
// 	const { updataRange, val, productsList } = useContext(ShopContext);
// 	let arrsort = productsList
// 		.map((p) => p.price)
// 		.sort(function (a, b) {
// 			return a - b;
// 		});

// 	return (
// 		<Box sx={{ width: '150px' }}>
// 			<Slider
// 				value={val}
// 				onChange={updataRange}
// 				aria-valuemax="10000"
// 				//getAriaLabel="filter price"
// 				valueLabelDisplay="auto"
// 				color="primary"
// 				min={arrsort[0]}
// 				max={arrsort[arrsort.length - 1]}
// 				style={{ color: 'gray' }}
// 			/>
// 		</Box>
// 	);
// }
// export default RangeSlider;

import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import shopContext from '../context/ShopConetext';

function ValueLabelComponent(props) {
	const { updataRange, val, productsList } = React.useContext(shopContext);
	const { children, value } = props;

	return (
		<Tooltip enterTouchDelay={0} placement="top" title={val}>
			{children}
		</Tooltip>
	);
}

ValueLabelComponent.propTypes = {
	children: PropTypes.element.isRequired,
	value: PropTypes.number.isRequired,
};

const AirbnbSlider = styled(Slider)(({ theme }) => ({
	color: '#3a8589',
	height: 3,
	padding: '13px 0',
	'& .MuiSlider-thumb': {
		height: 27,
		width: 27,
		backgroundColor: '#fff',
		border: '1px solid currentColor',
		'&:hover': {
			boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
		},
		'& .airbnb-bar': {
			height: 9,
			width: 1,
			backgroundColor: 'currentColor',
			marginLeft: 1,
			marginRight: 1,
		},
	},
	'& .MuiSlider-track': {
		height: 3,
	},
	'& .MuiSlider-rail': {
		color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
		opacity: theme.palette.mode === 'dark' ? undefined : 1,
		height: 3,
	},
}));

function AirbnbThumbComponent(props) {
	const { children, ...other } = props;
	return (
		<SliderThumb {...other}>
			{children}
			<span className="airbnb-bar" />
			<span className="airbnb-bar" />
			<span className="airbnb-bar" />
		</SliderThumb>
	);
}

AirbnbThumbComponent.propTypes = {
	children: PropTypes.node,
};

export default function RangeSlider() {
	const { updataRange, val, productsList } = React.useContext(shopContext);
	let arrsort = productsList
		.map((p) => p.price)
		.sort(function (a, b) {
			return a - b;
		});

	return (
		<Box sx={{ width: 320 }}>
			<Box sx={{ m: 3 }} />

			<Typography gutterBottom>Filter Price</Typography>
			<AirbnbSlider
				onChange={updataRange}
				value={val}
				valueLabelDisplay="auto"
				color="primary"
				min={arrsort[0]}
				max={arrsort[arrsort.length - 1]}
				components={{ Thumb: AirbnbThumbComponent }}
				getAriaLabel={(index) =>
					index === 0 ? 'Minimum price' : 'Maximum price'
				}
				defaultValue={[arrsort[0], arrsort.length - 1]}
			/>
		</Box>
	);
}
