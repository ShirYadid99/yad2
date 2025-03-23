var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize')
const db = require("../models")

const adsController = require('../controllers/adsController')


/* GET home page. */
// Route to render the index.ejs file
router.get('/', adsController.homePage);

module.exports = router;

