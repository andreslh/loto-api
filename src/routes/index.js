const express = require('express');
const clientsRouter = require('./clients');
const usersRouter = require('./users');
const adminRouter = require('./admin');
const { authenticateJWT, isAdmin } = require('../validators/authentication');

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/admin', authenticateJWT, isAdmin, adminRouter);
apiRouter.use('/clients', authenticateJWT, clientsRouter);

module.exports = apiRouter;
