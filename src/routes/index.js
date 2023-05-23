const express = require('express');
const clientsRouter = require('./clients');
const { authenticateJWT } = require('../validators/authentication');

const apiRouter = express.Router();

apiRouter.use('/clients', authenticateJWT, clientsRouter);

module.exports = apiRouter;
