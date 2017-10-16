const routes = require('express').Router();
const RequestControlller = require('./RequestController');
const UserControlller = require('./UserController');

routes.get('/', function (req, res) {
    res.status(200).send({message: 'Welcome to the API!'});
});

// Food Requests
routes.post('/user/signup',UserControlller.signup);
routes.get('/request/:shortId', RequestControlller.getByShortId);
routes.get('/requests', RequestControlller.getByQueryParams);

routes.all('*', function (req, res) {
    res.status(404).send({error: 404, message: 'invalid endpoint'});
});

module.exports = routes;
