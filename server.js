const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectRouter = require('./routes/projectRoute');
const actionRouter = require('./routes/actionRoute');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    err
  });
}

module.exports = server;
