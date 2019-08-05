const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectRouter = require('./routes/projectRoute');
const actionRouter = require('./routes/actionRoute');

require('dotenv').config();

const port = process.env.PORT ? process.env.PORT : 4000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.use(errorHandler);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

server.get('/', (res, req) => {
  res.send('Hello');
});

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
