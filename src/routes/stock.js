const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stock');

router.post('/addStock', stockController.addStock);
router.get('/watchlist', stockController.getAllStock);
router.put('/recentPrice', stockController.getOneStock);
router.delete('/remove', stockController.removeStock);
module.exports = router;
