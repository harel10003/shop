const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const checkAuth = require('./api/middlewares/checkAuth');
require('dotenv').config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
	//`mongodb+srv://harel-shop:harel162@cluster0.bvkoa.mongodb.net/gocodeShop?retryWrites=true&w=majority`
	`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
);

mongoose.connection.on('connected', () => {
	console.log('db connect');
});

// const ArticlesRoutes = require('./api/routes/articles');
// const categoriesRoutes = require('./api/routes/categories');
// const usersRoutes = require('./api/routes/users');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(express.static('client/build')); //כל קובץ יגיע מכאן

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested, Contetnt-Type, Accept,Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
		return res.status(200).json({});
	}
	next();
});

//Routes

// app.use('/api/products', ProductsRoutes);
// app.use('/categories', checkAuth, categoriesRoutes);
// app.use('/users', usersRoutes);
//לבדוק איך לא יתנגש עם 404
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

app.use((req, res, next) => {
	const error = new Error('not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
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

module.exports = app;
