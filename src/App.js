import './App.css';
import Header from './component/Header/Header';
import Products from './component/Products/Products';
import { useEffect, useState } from 'react';
import ShopContext from '../src/component/context/ShopConetext';
import SliderRange from './component/Header/SliderRange';
import DrawerCart from './component/drawer/DrawerCart';
import ProductDetails from './pages/ProductDetails';
import Spinner from './component/layout/Spinner';
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
		// if (productsList.length === 0) <Spinner />;
		// inputRef.current.focus();
		// else
		fetch('https://fakestoreapi.com/products')
			.then((res) => {
				return res.json();
			})
			.then((products) => {
				setProductsList(products);
				setFilterdList(products);
				PriceCheck();
			});
	}, []);

	let showMinus = (id) => {
		if (cartList.includes(id) === true) return 'inline';
		else return 'none';
	};
	const removeProduct = (id) =>
		setCartlist(
			cartList.filter((p, index) => cartList.indexOf(id) !== index)
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

	const thisProduct = (id) => productsList.filter((p) => p.id === id)[0];
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
						<Route path="/productid/:id">
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
