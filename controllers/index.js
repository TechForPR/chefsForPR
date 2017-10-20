const routes = require('express').Router();
const RequestController = require('./RequestController');
const DeliveryController = require('./DeliveryController');
const UserController = require('./UserController');

routes.get('/', function(req, res) {
  res.status(200).send({
    message: 'Welcome to the API!'
  });
});

// Food Requests
routes.post('/request', RequestController.create);
routes.get('/request/:shortId', RequestController.getByShortId);
routes.get('/requests', RequestController.getByQueryParams);

// Delivery reports
routes.post('/delivery', DeliveryController.create);
routes.get('/delivery/:shortId', DeliveryController.getByShortId);
routes.get('/deliveries', DeliveryController.getByQueryParams);


routes.post('/user/signup', UserController.signup);
routes.post('/user/login', UserController.login);

routes.all('*', function(req, res) {
  res.status(404).send({
    error: 404,
    message: 'invalid endpoint'
  });
});

module.exports = routes;
