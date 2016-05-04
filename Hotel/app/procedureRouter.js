'use strict';

const express = require('express');
const router = express.Router();
const SqlContext = require('./repositories/sqlContext');
const getSuccess = require('./helpers/responseHelper').getSuccess
const getError = require('./helpers/responseHelper').getError

function getContext(request) {
    return new SqlContext({
            login: request.cookies.login,
            password: request.cookies.password
        }
    );
}

router.post('/Clients/DeleteBestClientInfo', (req, res) => {
    getContext(req).Clients().deleteBestClientInfo(req.body.year)
        .then(() => getSuccess(res,'Success'))
        .catch((err) => {
            getError(err, res,'there was an error');
        })
});

module.exports = () => router;
