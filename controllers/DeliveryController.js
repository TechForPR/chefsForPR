const Delivery = require('../models/Delivery');

function create(req, res) {
    if (!req.body || !req.body.data) {
        return res.status(422).send({error: 422, message: 'Missing data'});
    }
    const delivery = new Delivery(req.body.data);
    delivery.save().then(doc => {
        res.status(200).send({ doc });
    }).catch(err => {
        res.status(400).send(Object.assign({error: 400}, err));
    });
}

function getByShortID(req, res) {
    Delivery.findOne({ shortId: req.params.shortId }).then(doc => {
        if (!doc) {
            res.status(404).send({ error: 404, message: `Request with id ${req.params.shortId} not found`});
            return;
        }
        res.status(200).send( { doc });
    }).catch((err) => {
        res.status(500).send(Object.assign(
            { error: 500, message: 'Server error'},
            err,
        ));
    });
}

module.exports = {
    create,
    getByShortID,
}
