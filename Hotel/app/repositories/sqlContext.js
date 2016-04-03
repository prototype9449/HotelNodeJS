'use strict';

let ClientRepository = require('./clientRepository');
let RoomRepository = require('./roomRepository');
let RoomClientRepository = require('./roomClientRepository');
let RoomReservationRepository = require('./roomReservationRepository');
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

    [contextNames.roomClient](){
        return new RoomClientRepository(this.user);
    }

    [contextNames.roomReservation](){
        return new RoomReservationRepository(this.user);
    }
}

module.exports = SqlContext;