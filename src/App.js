import './App.css';
import Header from './component/Header/Header';
import Cart from './component/cart/Cart';
import Products from './component/Products/Products';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import ShopContext from '../src/component/context/ShopConetext';
import SliderRange from './component/Header/SliderRange';

function App() {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(10000);
	const [productsList, setProductsList] = useState([]);
	const [pLMinMax, setPLMinMax] = useState([productsList]);
	const [filteredList, setFilterdList] = useState(pLMinMax);
	const [cartList, setCartlist] = useState([]);
	useEffect(() => {
		// inputRef.current.focus();
		fetch('https://fakestoreapi.com/products')
			.then((res) => {
				return res.json();
			})
			.then((products) => {
				setProductsList(products);
				setFilterdList(products);
			});
	}, []);

	const categories = productsList
		.map((p) => p.category)
		.filter((value, index, array) => array.indexOf(value) === index);

	const [val, setVal] = useState([minPrice, maxPrice]);
	const updataRange = (e, data) => {
		setVal(data);
		setMinPrice(val[0]);
		setMaxPrice(val[1]);
		filterCategory(catgoryNow);
	};
	const [catgoryNow, setCatgoryNow] = useState('all');
	const filterCategory = (category) => {
		setCatgoryNow(category);
		if (category === 'all') {
			setFilterdList(
				productsList.filter(
					(p) => p.price > minPrice && p.price < maxPrice
				)
			);
		} else {
			setFilterdList(
				productsList.filter(
					(p) =>
						p.category === category &&
						p.price > minPrice &&
						p.price < maxPrice
				)
			);
		}
	};

	// let minPrice = 100;
	// let maxPrice = 120;

	// 	const PriceCheck = () => {
	// 		productsList.forEach((p) => {
	// 			if (maxPrice < p.price) maxPrice = p.price;
	// 			if (minPrice > p.price) minPrice = p.price;
	// 		});
	// 	};
	// const maxP=100000;
	// 	const maxPrice =()=>productsList.forEach((p) => {
	// 		if (maxP <= p.price) maxP = p.price
	// 		console.log(maxPrice);
	// 		})

	// let minP=0
	// 	const minPrice =()=> productsList.forEach((p) => {
	// 		if (minPrice < p.price) maxPrice = p.price
	// 		console.log(maxPrice);
	// 	};

	return (
		<ShopContext.Provider
			value={[
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
			]}
		>
			<div className="App">
				<Header list={categories} onFilter={filterCategory} />
				{minPrice}-{maxPrice}-{catgoryNow}
				<SliderRange />
				<Cart />
				<Products listProducts={filteredList} />
				{/* <Products listProducts={pLMinMax} /> */}
			</div>
		</ShopContext.Provider>
	);
}

export default App;
