const Admin = require('../models/ad');
const db = require("../models");
const Sequelize = require("sequelize");
const {Op} = require("sequelize");


/**
 * Render the post ad page with a welcome message or information about the last post.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */

exports.postAd = (req, res) => {

    const lastPost = req.cookies.lastPost;

    if (!lastPost) {
        // If no last post cookie exists, it's the user's first post
        res.render('add', { msg: 'Welcome! This is your first post.' });
    } else {
        // If last post cookie exists, render a message with the last post's timestamp or ID
        res.render('add', { msg: `Hii ${lastPost.email} your last post was made at ${lastPost.date}.` });
    }
}

/**
 * Save the provided ad details to the database and set a cookie for the last post information.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */

exports.addToDB = (req, res) => {
    const { title, description, price, phone, email } = req.body;

    let ad = db.Ad.build({
        title: title,
        description: description,
        price: price,
        phone: phone,
        email: email,
        approved: false
    });

    return ad.save()
        .then((ad) => {
            // Date formatting logic
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
            const day = currentDate.getDate();
            // Format the date string in the desired format (YYYY-MM-DD)
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

            // Create the lastPost object with email and formatted date
            const lastPost = {
                email: req.body.email,
                date: formattedDate
            };

            // Set the cookie with the lastPost object
            res.cookie('lastPost', lastPost, { maxAge: 900000, httpOnly: true });

            // Render the success message
            res.render('adStatus', {
                statusTitle: "Succeeded",
                statusDescription: "Your ad was successfully posted and waiting for approval"
            });
        })
        .catch((err) => {
            // Handle errors
            let errorMessage = "";
            if (err instanceof Sequelize.ValidationError) {
                errorMessage = `Invalid input: ${err}`;
            } else if (err instanceof Sequelize.DatabaseError) {
                errorMessage = `Database error: ${err}`;
            } else {
                errorMessage = `Unexpected error: ${err}`;
            }

            // Render the error message
            res.render('adStatus', {
                statusTitle: "Failed",
                statusDescription: errorMessage
            });
        });
}


/**
 * Search for ads in the database based on the provided search query.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The callback function to proceed to the next middleware.
 * @returns {void}
 */
exports.searchAd = (req, res, next) => {
    const searchQuery = req.query.search; // Retrieve the search query from the request query parameters
    const queryOptions = {
        where: {
            approved: true // Filter only approved ads
        },
        order: [['createdAt', 'DESC']]
    };

    if (searchQuery) {
        queryOptions.where.title = {
            [Op.like]: `%${searchQuery}%` // Use the Sequelize like operator to search for partial matches
        };
    }
    // Fetch data from the database using Sequelize with the constructed options
    db.Ad.findAll(queryOptions)
        .then(ads => {
            // Render index.ejs with the fetched data and search query
            res.render('index', { data: ads, searchQuery });
        })
        .catch(error => {
            res.render('catchError', { error: error })
            // res.status(500).send('Internal Server Error');
        });
}

/**
 * Render the home page with approved ads fetched from the database.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The callback function to proceed to the next middleware.
 * @returns {void}
 */
exports.homePage = (req, res, next) => {
    // Fetch data from the database using Sequelize
    db.Ad.findAll({
        where: { approved: true },
        order: [['createdAt', 'DESC']] // Order by createdAt column in descending order
    })
        .then(ads => {
            // Render index.ejs with the fetched data
            res.render('index', { data: ads });
        })
        .catch(error => {
            res.render('catchError', { error: error })
            // res.status(500).send('Internal Server Error');
        });
}

