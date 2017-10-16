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
    });
    // }).catch((err) => {
    //     res.status(500).send(Object.assign(
    //         { error: 500, message: 'Server error'},
    //         err,
    //     ));
    // });
}

function getByQueryParams(req, res){
    var query = {};
    var sortBy = {};
    var limit = 25;
    // add request query params
    for(param in req.query){
        if(["limit","sortBy"].indexOf(param) < 0){
            query[param] = req.query[param];
        }
    }
    // limit to 25 by docs by default, "limit" query param overwrites this value
    var re = /^[0-9]*$/i;
    if(req.query.hasOwnProperty('limit') && req.query.limit.match(re)){
        limit = parseInt(req.query.limit);
    }
    // sortBy by one field
    var re = /^[-|+]+[a-zA-Z0-9]*$/i;
    if(req.query.hasOwnProperty('sortBy') && req.query.limit.match(re)){
        sortBy = req.query[param];
    }
    // query the schema
    Request.find(query).limit(limit).sort(sortBy).then((docs) => {
        if(docs.length > 0){
            res.status(200).send( docs );
        }else{
            res.status(404).send({ error: 404, message: 'No documents matching criteria'});
        }
    });
    // }).catch((err) => {
    //     res.status(500).send(Object.assign(
    //         { error: 500, message: 'Server error'},
    //         err,
    //     ));
    // });
}

module.exports = {
    create,
    getByShortId,
    getByQueryParams
}
