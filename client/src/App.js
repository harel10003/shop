import './App.css';
import Header from '../src/component/Header/Header';

import { useEffect, useState } from 'react';
import ShopContext from '../src/component/context/ShopConetext';

import ProductDetails from './pages/ProductDetails';

import Home from './pages/Home';
import About from './pages/About';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(2000);
	const [productsList, setProductsList] = useState([]);
	const [pLMinMax, setPLMinMax] = useState([productsList]);
	const [filteredList, setFilterdList] = useState(pLMinMax);
	const [cartList, setCartlist] = useState([]);
	useEffect(() => {
		setProductsList([]);
		// inputRef.current.focus();
		fetch('/api/products')
			.then((res) => {
				return res.json();
			})
			.then((products) => {
				setProductsList(products);
				setFilterdList(products);
				PriceCheck();
			});
	}, []);

	let showMinus = (_id) => {
		if (cartList.includes(_id) === true) return 'inline';
		else return 'none';
	};
	const removeProduct = (_id) =>
		setCartlist(
			cartList.filter((p, index) => cartList.indexOf(_id) !== index)
		);

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

	const [maxP, setMaxP] = useState(0);
	const [minP, setMinP] = useState(1000000);

	const PriceCheck = () => {
		productsList.forEach((p) => {
			if (maxP <= p.price) {
				setMaxP(p.price);
			}
			if (minP >= p.price) {
				setMinP(p.price);
			}
		});
	};

	const thisProduct = (_id) => productsList.filter((p) => p._id === _id)[0];
	let sumTotal = 0;
	const TotalPrice = () => {
		// debugger;
		sumTotal = 0;
		cartList.forEach((p) => {
			sumTotal += thisProduct(p).price;
		});

		return sumTotal;
	};

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
				minP,
				maxP,
				thisProduct,
				sumTotal,
				TotalPrice,
				catgoryNow,
				filteredList,
				showMinus,
				removeProduct,
				categories,
				filterCategory,
			]}
		>
			<Router>
				<div className="App">
					<Header />
					<br />

					<Switch>
						<Route path="/products/:_id">
							<ProductDetails />
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		</ShopContext.Provider>
	);
}

export default App;
