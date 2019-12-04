const express = require('express'); // importing a CommonJS module
const helmet = require("helmet"); /// Security

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

/// Custom Middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next(); ///allows request to continue to the next middleware/routeHandler
}

function lockedDown(req, res, next) {
  if (req.headers.password === "melon") {
    next();
  } else {
    res.send(res.status(401), "You shall not pass!!!")
  }
}

/// Write a gatekeeper middlewar that reads a password from headers
///If password is "melon" let it pass
/// If not send back status 401 and a message

/// Middleware
server.use(helmet());
server.use(express.json()); /// built in middleware
server.use(logger);

/// Endpoints
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  /// Super Secret Place using Helmet
  server.get('/area51', helmet(), (req, res) => {
    lockedDown();
    const nameInsert = (req.name) ? ` ${req.name}` : '';
    res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
  });

  module.exports = server;
