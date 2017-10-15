const Request = require('../models/Request');

function create(req, res) {
    if (!req.body || !req.body.data) {
        return res.status(422).send({error: 422, message: 'Missing data'});
    }
    const request = new Request(req.body.data);
    request.save().then(doc => {
        res.status(200).send({ doc });
    }).catch(err => {
        res.status(400).send(Object.assign({error: 400}, err));
    });
}

function getByShortId(req, res) {
    Request.findOne({ shortId: req.params.shortId }).then(doc => {
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

function getByQueryParams(req, res){
    // add request query params
    var query = {};
    for(param in req.query){
        query[param] = req.query[param];
    }
    Request.find(query).then((docs) => {
        if(docs.length > 0){
            res.status(200).send( docs );
        }else{
            res.status(404).send({ error: 404, message: 'No documents matching criteria'});
        }
    }).catch((err) => {
        res.status(500).send(Object.assign(
            { error: 500, message: 'Server error'},
            err,
        ));
    });
}

module.exports = {
    create,
    getByShortId,
    getByQueryParams
}
