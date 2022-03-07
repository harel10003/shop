import Product from '../Product/Product';
import Spinner from '../layout/Spinner';
import './Products.css';

function Products({ listProducts }) {
	const list = listProducts;

	// if (list.length === 0) return <Spinner />;
	if (list[0].title === undefined || list.length === 0) return <Spinner />;
	else {
		const renderProducts = () =>
			listProducts.map(({ id, price, title, image }, index) => (
				<Product
					key={`${id}_${index}`}
					title={title}
					image={image}
					price={price}
					id={id}
				/>
			));
		return <section className="products">{renderProducts()}</section>;
	}
}

export default Products;
