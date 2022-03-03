import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrderProduct from '../component/Product/OrderProduct';

function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState([]);
	// const inputRef = useRef(null);
	// if (inputRef && inputRef.current) inputRef.current.focus();

	useEffect(() => {
		// inputRef.current.focus();
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then((res) => res.json())
			.then((Todo) => setProduct(Todo));
	}, [id]);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					component="img"
					height="400"
					image={product.image}
					alt={product.title}
				/>

				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{product.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{product.description}
						<h2
							style={{
								textAlign: 'center',
								fontSize: '20px',
								margin: '10px 0 0 0',
							}}
						>
							{product.price}$
						</h2>
					</Typography>
				</CardContent>

				<CardActions
					style={{ display: 'flex', justifyContent: 'space-around' }}
				>
					<OrderProduct
						image={product.image}
						title={product.title}
						price={product.price}
						id={product.id}
					/>
					<Button size="small" variant="outlined">
						<Link
							to="/"
							style={{
								color: 'lightslategray',
								textDecoration: 'none',
							}}
						>
							HOME
						</Link>{' '}
					</Button>

					{/* <Button size="small">Learn More</Button> */}
				</CardActions>
			</Card>
		</div>
	);
}

export default ProductDetails;
