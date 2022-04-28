import Product from '../Product/Product';
import Spinner from '../layout/Spinner';
import './Products.css';

function Products({ listProducts }) {
	const list = listProducts;

	if (list[0].title === undefined || list.length === 0) return <Spinner />;
	else {
		const renderProducts = () =>
			listProducts.map(({ _id, price, title, image }, index) => (
				<Product
					key={`${_id}_${index}`}
					title={title}
					image={image}
					price={price}
					_id={_id}
				/>
			));
		return <section className="products">{renderProducts()}</section>;
	}
}

export default Products;
