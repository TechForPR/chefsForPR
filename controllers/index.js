const routes = require('express').Router();

routes.get('/', function (req, res) {
    res.status(200).send({message: 'Welcome to the API!'});
});

routes.all('*', function (req, res) {
    res.status(404).send({error: 404, message: 'invalid endpoint'});
});

module.exports = routes;
