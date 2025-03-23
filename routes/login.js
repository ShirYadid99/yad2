var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize')
const db = require("../models")

const adminController = require('../controllers/adminController')



router.get('/', adminController.authenticateUserForLogin,  (req, res) => {
  res.render('login', { isGoodUsernamePassword: true });
});


module.exports = router;

