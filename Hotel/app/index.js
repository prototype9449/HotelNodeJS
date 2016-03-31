'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const contextNames = require('./repositories/contextNames');
const createRouter = require('./routerCreator');
const procedureRouter = require('./procedureRouter');

const app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(procedureRouter());
app.use('/clients', createRouter(contextNames.clients));
app.use('/rooms', createRouter(contextNames.rooms));
app.use('/roomClients', createRouter(contextNames.roomClients));
app.use('/roomReservations', createRouter(contextNames.roomReservations));

app.listen(3000);