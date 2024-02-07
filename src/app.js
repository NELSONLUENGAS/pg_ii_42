require('./database/config');
const express = require('express');
const routes = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// errors
app.use((error, req, res, next) => {
	res.status(500).send('Error en el servidor');
});

// routes
app.use('/', routes);

module.exports = app;
