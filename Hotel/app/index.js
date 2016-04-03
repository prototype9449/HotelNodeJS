'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const contextNames = require('./repositories/contextNames');
const setRoute = require('./setRoute');
const procedureRouter = require('./procedureRouter');

const app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(procedureRouter());

setRoute(app, contextNames.roomReservations);
setRoute(app, contextNames.clients);
setRoute(app, contextNames.rooms);
setRoute(app, contextNames.roomClients);

app.listen(3000);