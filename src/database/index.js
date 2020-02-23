const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

const connection = new Sequelize(dbConfig);

User.init(connection);
Account.init(connection);
Transaction.init(connection);
Category.init(connection);

User.associate(connection.models);
Account.associate(connection.models);
Transaction.associate(connection.models);
Category.associate(connection.models);

module.exports = connection;
