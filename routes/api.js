var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize')
const db = require("../models")
const { Op } = require('sequelize');


const adsController = require('../controllers/adsController')

router.post('/added', adsController.addToDB);

router.get('/search', adsController.searchAd);

module.exports = router;

