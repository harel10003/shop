import './Product.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useContext, useEffect } from 'react';
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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Category } from '@mui/icons-material';
import Popup from './Popup';

function Product({ image, title, price, _id }) {
	useEffect(() => {
		AOS.init();
	}, []);

	const { thisProduct } = useContext(ShopContext);

	return (
		<div className="product-card" data-aos="flip-left">
			<Card sx={{ maxWidth: 345 }}>
				{/* <CardMedia
					component="img"
					height="200"
					image={image}
					alt={title}
				
				/> */}
				<Popup _id={_id} image={image} title={title} editor="false" />
				<CardContent>
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						style={{ fontSize: '14px', height: '40px' }}
					>
						{title}
					</Typography>
				</CardContent>
				<CardActions>
					<OrderProduct
						image={image}
						title={title}
						price={price}
						_id={_id}
					/>
					<Button variant="text">
						<Link
							to={`/products/${_id}`}
							style={{ color: 'gray', textDecoration: 'none' }}
						>
							more details
						</Link>
					</Button>
				</CardActions>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						margin: '0 7% 7% 7%',
					}}
				>
					<h3>{price}$</h3> {thisProduct(_id).category}
				</div>
			</Card>
		</div>
	);
}
export default Product;
