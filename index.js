const server = require('./server');
require('dotenv').config();

const port = process.env.PORT ? process.env.PORT : 4000;

server.get('/', (req, res) => {
  res.send(
    `<h1>View Postman Docs <a href="https://documenter.getpostman.com/view/8230639/SVYqPKQd?version=latest">Here</a></h1>`
  );
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
