const express = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AccountsController = require('./controllers/AccountsController');
const TransactionsController = require('./controllers/TransactionsController');
const CategoriesController = require('./controllers/CategoriesController');

const routes = express.Router();

// Auth
routes.post('/api/login', AuthController.login);
routes.post('/api/validate', AuthController.validateToken);

// Users
routes.get('/api/users/:userId', UserController.getById);
routes.post('/api/users', UserController.create);

// Accounts
routes.get('/api/accounts/:userId/user', AccountsController.list);
routes.get('/api/accounts/:accountId', AccountsController.getById);
routes.post('/api/accounts/:userId', AccountsController.create);
routes.put('/api/accounts/:accountId', AccountsController.update);
routes.delete('/api/accounts/:accountId', AccountsController.delete);

// Transactions
routes.get('/api/transactions/:transactionId', TransactionsController.getById);
routes.get('/api/transactions/:userId/amount', TransactionsController.getTransactionsAmount);
routes.get('/api/transactions/:userId/user', TransactionsController.listByUser);
routes.post('/api/transactions', TransactionsController.create);
routes.put('/api/transactions/:transactionId', TransactionsController.update);
routes.delete('/api/transactions/:transactionId', TransactionsController.delete);

// Categories
routes.get('/api/categories', CategoriesController.listByType);
routes.get('/api/categories/:categoryId', CategoriesController.getById);
routes.post('/api/categories', CategoriesController.create);

module.exports = routes;
