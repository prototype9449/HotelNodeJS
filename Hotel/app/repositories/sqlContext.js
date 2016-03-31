'use strict';

let ClientRepository = require('./clientRepository');
let RoomRepository = require('./roomRepository');
let RoomClientRepository = require('./roomClientRepository');
let RoomReservationRepository = require('./clientRepository');
let contextNames = require('./contextNames');

class SqlContext{
    constructor(user){
        this.user = user;
    }

    [contextNames.clients](){
        return new ClientRepository(this.user);
    }

    [contextNames.rooms](){
        return new RoomRepository(this.user);
    }

    [contextNames.roomClients](){
        return new RoomClientRepository(this.user);
    }

    [contextNames.roomReservations](){
        return new RoomReservationRepository(this.user);
    }
}

module.exports = SqlContext;