const express = require('express');
const clientsRouter = require('./clients');
const usersRouter = require('./users');
const { authenticateJWT } = require('../validators/authentication');

const apiRouter = express.Router();

//apiRouter.use('/clients', authenticateJWT, clientsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/clients', clientsRouter);

module.exports = apiRouter;
