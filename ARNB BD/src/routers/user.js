const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const router = new express.Router();

router.post('/users', userController.createUser);

router.post('/users/login', userController.loginUser);

router.post('/users/logout', auth, userController.logoutUser);

router.get('/users/me', auth, userController.getUserProfile);

module.exports = router;
