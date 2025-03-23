var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize')
const db = require("../models")

const adsController = require('../controllers/adsController')

router.get('/', adsController.postAd);


module.exports = router;

