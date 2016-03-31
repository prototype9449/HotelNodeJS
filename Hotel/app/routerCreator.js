'use strict';

var express = require('express');
var router = express.Router();
let SqlContext = require('repositories/sqlContext');

function createRouter(contextName){
    router.get('/', (req, res) => {
        //let user = {
        //    login: req.cookie.login,
        //    password: req.cookie.password
        //};

        let user = {
            login: 'admin',
            password: 'admin'
        };
        new SqlContext(user)[contextName]().getAll()
            .then((objects) => {
                res.send(objects);
            })
            .catch((err) => {
                console.log(err);
                res.send('there was an error');
            });
    });

    router.post('/', (req, res) => {
        new SqlContext(req.body.user)[contextName]().insert(req.body.object)
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