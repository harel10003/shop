const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const port = 8000;
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static('client/build'));
// const res = require('express/lib/response');
//לשנות הרייטניג במיקס
const productSchema = new mongoose.Schema({
	title: String,
	price: Number,
	description: String,
	category: String,
	image: String,
	rating: {},
});
const Product = mongoose.model('Product', productSchema);

//create new product
app.post('/api/products', (req, res) => {
	const { title, description, category, image, price, rating } = req.body; //recived from the web
	const product = new Product({
		title,
		description,
		category,
		image,
		price,
		rating,
	}); //new obj and after save
	product.save((err, product) => {
		console.log('err', err);
		res.send(product);
	});
});

// get products+filter by saerch title and category and price
app.get('/api/products', (req, res) => {
	const { category, minPrice, maxPrice, title } = req.query;
	//!!לבדוק איך מכניסים את הריקוסט בגט!!
	//איך עושים טו לוור קייס מול הדאטה בייס toLocaleLowerCase
	Product.find((err, products) => {
		if (category && minPrice && maxPrice) {
			products = products.filter(
				(product) =>
					product.category.toLowerCase() === category.toLowerCase() &&
					product.price > +minPrice &&
					product.price < +maxPrice
			);
			return res.send(products);
		}
		if (category) {
			products = products.filter(
				(product) =>
					product.category.toLowerCase() === category.toLowerCase()
			);
			return res.send(products);
		}
		if (minPrice) {
			products = products.filter((product) => product.price > +minPrice);
			return res.send(products);
		}
		if (maxPrice) {
			products = products.filter((product) => product.price < +maxPrice);
			return res.send(products);
		}
		if (title) {
			products = products.filter((product) =>
				product.title.toLowerCase().includes(title.toLowerCase())
			);
			return res.send(products);
		}
		return res.send(products);
	});
});

//get specific product by id from the link
app.get('/api/products/:id', (req, res) => {
	const id = req.params.id;
	Product.findById(id, (err, product) => {
		res.send(product);
	});
});

//delete product by id
app.delete('/api/products/:id', (req, res) => {
	const { id } = req.params;
	Product.findByIdAndDelete(id, (err, product) => {
		if (err) {
			console.log(err), res.send('ID not found');
		}
		res.send(product);
	});
});

//update product by id or title
//is show in the res the hold res if we want the new res we need {new:true}
app.put('/api/products/:id', (req, res) => {
	const { id } = req.params;
	const { title, price, description, category, image, rating } = req.body;

	Product.findByIdAndUpdate(
		id,
		{
			id,
			title,
			price,
			description,
			category,
			image,
			rating,
		},
		{ new: true },
		(err, product) => res.send(product)
	);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

const initDb = () => {
	Product.findOne((err, data) => {
		if (!data) {
			fs.readFile('./products.json', 'utf8', (err, data) => {
				const products = JSON.parse(data);
				Product.insertMany(products, (err, data) => {
					if (err) console.log(err);
					else {
						console.log(`is inside ${products.length} reshumot`);
					}
				});
			});
		}
	});
};

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
	// 'mongodb://localhost/products_shop', //locally
	`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) return console.log(err);
	},
	app.listen(process.env.PORT || port, () => {
		initDb();
		console.log(`app listen in port ${port} and db on`);
	})
);
