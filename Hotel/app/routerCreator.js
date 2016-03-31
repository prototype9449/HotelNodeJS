'use strict';

var express = require('express');
var router = express.Router();
let SqlContext = require('./repositories/sqlContext');

function getContext(request) {
    return new SqlContext({
            login: request.cookies.login,
            password: request.cookies.password
        }
    );
}

function createRouter(contextName) {
    router.get('/', (req, res) => {
        getContext(req)[contextName]().getAll()
            .then((objects) => {
                res.send(objects);
            })
            .catch((err) => {
                console.log(err);
                res.send('there was an error');
            });
    });

    router.post('/', (req, res) => {
        getContext(req)[contextName]().insert(req.body.object)
            .then(() => {
                res.send('Success');
            })
            .catch((err) => {
                console.log(err);
                res.send('there was an error');
            })
    });

    router.put('/', (req, res) => {
        getContext(req)[contextName]().update(req.body.oldObject, req.body.newObject)
            .then(() => {
                res.send('Success');
            })
            .catch((err) => {
                console.log(err);
                res.send('there was an error');
            })
    });

    router.delete('/', (req, res) => {
        getContext(req)[contextName]().delete(req.body.object)
            .then(() => {
                res.send('Success');
            })
            .catch((err) => {
                console.log(err);
                res.send('there was an error');
            })
    });


    return router;
}


module.exports = createRouter;