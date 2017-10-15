const routes = require('express').Router();
const RequestControlller = require('./RequestController');
const DeliveryControlller = require('./DeliveryController');

routes.get('/', function (req, res) {
    res.status(200).send({message: 'Welcome to the API!'});
});

// Food Requests
routes.post('/request', RequestControlller.create);
routes.get('/request/:shortId', RequestControlller.getByShortId);
routes.get('/requests', RequestControlller.getByQueryParams);

// Delivery reports
routes.post('/delivery', DeliveryControlller.create);

routes.all('*', function (req, res) {
    res.status(404).send({error: 404, message: 'invalid endpoint'});
});

module.exports = routes;
