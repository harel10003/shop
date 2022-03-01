import './Product.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useContext } from 'react';
import ShopContext from '../context/ShopConetext';

function Product({ image, title, price, id }) {
	const [cartList, setCartlist] = useContext(ShopContext);

	let showMinus = () => {
		if (cartList.includes(id) === true) return 'inline';
		else return 'none';
	};
	const removeProduct = (id) =>
		setCartlist(
			cartList.filter((p, index) => cartList.indexOf(id) !== index)
		);

	return (
		<div className="product-card">
			<div className="product-image">
				<img src={image} alt="{title}" />
			</div>
			<div className="product-info">
				<h5>{title}</h5>

				<div>
					<AiOutlinePlus
						onClick={() => {
							setCartlist([id, ...cartList]);
						}}
						style={{ cursor: 'pointer' }}
					/>

					<h6>{price}$</h6>
					<AiOutlineMinus
						style={{ display: showMinus(id), cursor: 'pointer' }}
						onClick={() => {
							removeProduct(id);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
export default Product;
