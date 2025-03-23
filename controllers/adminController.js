const Admin = require('../models/user');
const db = require("../models");

/**
 * Middleware to check if the user is authenticated as an admin.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The callback function to proceed to the next middleware.
 * @returns {void}
 */

exports.authenticateUser = (req, res, next) => {
    if (req.session && req.session.isAdmin ) {
        // User is authenticated and is an admin, proceed to the next middleware
        next();
    } else {
        // User is not authenticated or is not an admin, redirect to login page
        res.redirect('/login');
    }
};



/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */
exports.login = (req, res) => {
    const { login, password } = req.body;
    db.User.findOne({
        where: {
            login: login,
            password: password
        }
    })
        .then(user => {
            if (user) {
                req.session.isAdmin = true
                res.render('admin');
            } else {
                res.render('login', { isGoodUsernamePassword: false });
            }
        })
        .catch(error => {
            res.render('catchError', { error: error })
            // res.status(500).send('Internal Server Error');
        });
}
/**
 * Displays ads by retrieving data from the database.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */

exports.showAds = (req, res) => {
    db.Ad.findAll()
        .then(data => {
            // Send the data as JSON to the client
            return res.json(data);
        })
        .catch(error => {
            res.render('catchError', { error: error })
            // res.status(500).send('Internal Server Error');
        });
}

/**
 * Deletes an ad based on the provided ad ID.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */

exports.deleteAd = (req, res) => {
    const adId = req.params.id;
    // Find the ad by its ID and delete it from the database
    db.Ad.destroy({
        where: {
            id: adId
        }
    })
        .then(numDeleted => {
            if (numDeleted === 1) {
                res.status(200).json({ message: 'Ad deleted successfully' });
            } else {
                // If no ad was found with the given ID
                res.status(404).json({ error: 'Ad not found' });
            }
        })
        .catch(error => {
            // Handle database errors
            res.render('catchError', { error: error })
            // res.status(500).send('Internal Server Error');
        });
}
/**
 * Approves an ad based on the provided ad ID.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */

exports.approveAd = (req, res) => {
    const adId = req.params.id;

    // Update the ad in the database
    db.Ad.update(
        { approved: true }, // Set isApproved to true
        { where: { id: adId } } // Update condition based on ad ID
    )
        .then(numUpdated => {
            if (numUpdated[0] === 1) {
                // If one ad was updated successfully
                res.status(200).json({ message: 'Ad approved successfully' });
            } else {
                // If no ad was found with the given ID
                res.status(404).json({ error: 'Ad not found' });
            }
        })
        .catch(error => {
            // Handle database errors
            res.render('catchError', { error: error })
            // res.status(500).send('Internal Server Error');
        });
}

/**
 * Middleware to check if the user is not authenticated as an admin (for login page).
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The callback function to proceed to the next middleware.
 * @returns {void}
 */

exports.authenticateUserForLogin = (req, res, next) => {
    if (!(req.session && req.session.isAdmin) ) {
        next();
    } else {
        res.redirect('/admin');
    }
};