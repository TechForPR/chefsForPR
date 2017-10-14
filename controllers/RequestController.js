const Request = require('../models/Request');

function create(req, res) {
    if (!req.body || !req.body.data) {
        return res.status(401).send({error: 401, message: 'Missing data'});
    }
    const request = new Request(req.body.data);
    request.save().then(doc => {
        res.status(200).send({ doc });
    }).catch(err => {
        res.status(400).send(Object.assign({error: 400}, err));
    });
}

module.exports = {
    create,
}
