'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Ad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Ad.init({
        title: {
            type: DataTypes.STRING(20), // Limit title to 20 characters
            allowNull: false, // Title is mandatory
        },
        description: {
            type: DataTypes.STRING(200), // Limit description to 200 characters
        },
        price: {
            type: DataTypes.FLOAT, // Price should be a number
            allowNull: false, // Price is mandatory
            validate: {
                min: 0, // Price should be >= 0
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^\d{3}-\d{7}$|^\d{2}-\d{7}$/ // Phone number format: XXX-XXXXXXX or XX-XXXXXXX
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // Email is mandatory
            validate: {
                is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
                isEmail: true // Validate email format
            }
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false // Default value for approved is false
        },
    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'Ad',
    });
    return Ad;
};