import './Product.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopConetext';
import OrderProduct from './OrderProduct';
import { Button } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

function Product({ image, title, price, id }) {
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
	] = useContext(ShopContext);

	return (
		<div className="product-card">
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					component="img"
					height="200"
					image={image}
					alt={title}
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						style={{ fontSize: '14px' }}
					>
						{title}
					</Typography>
				</CardContent>
				<CardActions>
					<OrderProduct
						image={image}
						title={title}
						price={price}
						id={id}
					/>
					<Button variant="text">
						<Link
							to={`/productid/${id}`}
							style={{ color: 'gray', textDecoration: 'none' }}
						>
							more details
						</Link>
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
export default Product;
