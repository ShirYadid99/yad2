const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize, // We need to pass the connection instance
    modelName: 'User',
  });
  return User;
};