require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const hbs = require('express-handlebars');

// Import Routes
const router = require('./routes/main');
const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stock');

// Set App Variable
const app = express();
app.use(cookieParser());
const checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

// enables supplying static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  extname: 'hbs',
  defaultLayout: 'main',
}));
app.set('views', path.join(__dirname, 'views'));

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Routes
app.use(router);
app.use('/auth', authRoutes);
app.use('/stock', stockRoutes);

// Set db
require('./data/stock_monitor-db');

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

module.exports = app;
