const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/sign-up', authController.signupUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
module.exports = router;
