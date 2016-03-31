'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const contextNames = require('./repositories/contextNames');
const createRouter = require('./routerCreator');
const app = express();

app.use(bodyParser());
app.use('/clients', createRouter(contextNames.clients));
app.use('/rooms', createRouter(contextNames.rooms));
app.use('/roomClients', createRouter(contextNames.roomClients));
app.use('/roomReservations', createRouter(contextNames.roomReservations));

app.listen(3000);