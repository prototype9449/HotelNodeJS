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

router.post('/Clients/DeleteBestClientInfo', (req, res) => {
    getContext(req).Clients().deleteBestClientInfo(req.body.year)
        .then(() => {
            res.send('success');
        })
        .catch((err) => {
            console.log(err);
            res.send('There was an error');
        });
});

module.exports = () => router;
