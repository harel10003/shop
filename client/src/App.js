import './App.css';
import Header from '../src/component/Header/Header';
import { useEffect, useState } from 'react';
import ShopContext from '../src/component/context/ShopConetext';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import About from './pages/About';
import Admin from './pages/Admin';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(2000);
	const [productsList, setProductsList] = useState([]);
	const [pLMinMax, setPLMinMax] = useState([productsList]);
	const [filteredList, setFilterdList] = useState([pLMinMax]);
	const [cartList, setCartlist] = useState([]);
	useEffect(() => {
		setProductsList([]);
		// inputRef.current.focus();
		fetch('api/products')
			.then((res) => res.json())
			.then((products) => {
				console.log(products);
				setProductsList(products);
				setFilterdList(products);
				// PriceCheck(products);
			});
	}, []);
	//רשימה מסוננת של המחירים לצורך הסינון
	const arrsort = () => {
		productsList.map((p) => p.price).sort();
	};
	// setMinPrice(arrsort[0]);
	// setMaxPrice(arrsort(arrsort.length - 1));

	// const [maxP, setMaxP] = useState(10000);
	// const [minP, setMinP] = useState(0);

	// console.log(arrsort);
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
		let arrsort = productsList
			.map((p) => p.price)
			.sort(function (a, b) {
				return a - b;
			});
		let num1;
		let num2;
		let i = 0,
			x = 0;
		console.log(arrsort);
		while (data[0] > arrsort[i]) {
			i++;
			console.log(arrsort[i]);
		}
		while (data[1] > arrsort[x]) {
			x++;
			console.log(arrsort[x]);
		}
		console.log(data[0], ' i: ', i, data[1], ' x: ', x);
		if (i < x - 1) {
			num1 = data[0];
			num2 = data[1];
		} else {
			num1 = data[0];
			num2 = arrsort[i + 1];
		}
		// debugger;
		setVal([num1, num2]);
		// setMinPrice(arrsort[0]);
		// setMaxPrice(arrsort[arrsort.length - 1]);
		setMinPrice(num1);
		setMaxPrice(num2);
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
	// let sortArr;
	// const PriceCheck = (arr) => {
	// 	let arr1 = arr.map((p) => p.price).sort();
	// 	console.log(arr1);
	// 	return (sortArr = arr1);
	// };
	const includesStr = (str) =>
		productsList.filter((p) => p.title.toLowerCase().includes(str));
	const thisProduct = (_id) => productsList.filter((p) => p._id === _id)[0];
	let sumTotal = 0;
	const TotalPrice = () => {
		sumTotal = 0;
		cartList.forEach((p) => {
			sumTotal += thisProduct(p).price;
		});

		return sumTotal;
	};

	return (
		<ShopContext.Provider
			value={{
				cartList,
				setCartlist,
				productsList,
				setProductsList,
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
				updataRange,
				setVal,
				val,
				setFilterdList,
				thisProduct,
				sumTotal,
				TotalPrice,
				catgoryNow,
				filteredList,
				showMinus,
				removeProduct,
				categories,
				filterCategory,
				includesStr,
			}}
		>
			<div className="App">
				<Router>
					<Header />
					<br />

					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/products/:id"
							element={<ProductDetails />}
						/>

						<Route
							path="/about"
							element={
								<About
									productsList={productsList}
									setProductsList={setProductsList}
									setFilterdList={setFilterdList}
								/>
							}
						/>
						<Route path="/admin" element={<Admin />} />
					</Routes>
				</Router>
			</div>
		</ShopContext.Provider>
	);
}

export default App;
