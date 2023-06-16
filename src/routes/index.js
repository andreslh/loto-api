const express = require('express');
const clientsRouter = require('./clients');
const usersRouter = require('./users');
const adminRouter = require('./admin');
const lotteryRouter = require('./lottery');
const playsRouter = require('./plays');
const { authenticateJWT, isAdmin } = require('../validators/authentication');

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/admin', authenticateJWT, isAdmin, adminRouter);
apiRouter.use('/clients', authenticateJWT, clientsRouter);
apiRouter.use('/lottery', authenticateJWT, isAdmin, lotteryRouter);
apiRouter.use('/plays', authenticateJWT, playsRouter);

module.exports = apiRouter;
