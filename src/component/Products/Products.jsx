import Product from '../Product/Product';
import Spinner from '../layout/Spinner';
import './Products.css';

function Products({ listProducts }) {
	if (listProducts.length === 0) return <Spinner />;
	else {
		return (
			<section className="products">
				{listProducts.map(({ id, price, title, image }) => (
					<Product
						key={id}
						title={title}
						image={image}
						price={price}
						id={id}
					/>
				))}
			</section>
		);
	}
}

export default Products;
