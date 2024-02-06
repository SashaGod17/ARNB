const express = require('express');
const auth = require('../middleware/auth');
const houseController = require('../controllers/houseController');
const router = new express.Router();

router.post('/houses', auth, houseController.createHouse);

router.patch('/houses/:id/rent', auth, houseController.rentHouse);

router.get('/houses', houseController.getAllHouses);

router.get('/houses/owned', auth, houseController.getOwnedHouses);

router.get('/houses/:id', houseController.getHouseById);

router.patch('/houses/:id', auth, houseController.updateHouse);

router.delete('/houses/:id', auth, houseController.deleteHouse);

module.exports = router;
