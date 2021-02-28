const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stock');

router.post('/addStock', stockController.addStock);

module.exports = router;
