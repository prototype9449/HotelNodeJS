'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class RoomReservationRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        return super.getObjects(object, constants.RoomReservation);
    }

    insert(roomReservation) {
        return super.insertObject(roomReservation, constants.RoomReservation);
    }

    delete(room) {
        return super.deleteObject(room, constants.RoomReservation);
    }

    update(oldObject, newObject) {
        return super.updateObject({oldObject, newObject}, constants.RoomReservation);
    }
}

module.exports = RoomReservationRepository;