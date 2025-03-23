var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize')
const db = require("../models")
const {where} = require("sequelize");

const adminController = require('../controllers/adminController')

router.post('/',adminController.login );

router.get('/', adminController.authenticateUser, (req,
                                                   res) => {
    // Render the login view with the isAdmin variable
    res.render('admin');
});

router.get('/ads', adminController.authenticateUser, adminController.showAds);

router.delete('/ads/:id', adminController.authenticateUser, adminController.deleteAd );

router.put('/ads/:id', adminController.authenticateUser, adminController.approveAd );

router.get('/logout', adminController.authenticateUser, (req,
                                                         res) => {
    // Render the login view with the isAdmin variable
    req.session.isAdmin = false
    res.redirect('/');
});

module.exports = router;

