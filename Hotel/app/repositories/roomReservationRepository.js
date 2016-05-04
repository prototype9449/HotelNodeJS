'use strict';
const sql = require('mssql');
const BaseRepository = require('./baseRepository');
const constants = require('../constants.json');
const types = {
    RoomId: sql.NVarChar(10),
    ClientId: sql.NVarChar(10),
    Term: sql.NVarChar(10),
    CheckInDate: sql.DateTime,
    strongEqual: ['CheckInDate']
}

const transformObject = (object) => {
    if(object.CheckInDate)
        object.CheckInDate = new Date(object.CheckInDate)
}


class RoomReservationRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        transformObject(object)
        return super.getObjects({types, object}, constants.RoomReservation);
    }

    insert(object) {
        transformObject(object)
        return super.insertObject({types, object}, constants.RoomReservation);
    }

    delete(objects) {
        objects.forEach(x => transformObject(x))
        return super.deleteObject({types, objects}, constants.RoomReservation);
    }

    update(oldObject, newObject) {
        transformObject(oldObject)
        transformObject(newObject)
        return super.updateObject({types, oldObject, newObject}, constants.RoomReservation);
    }
}

module.exports = RoomReservationRepository;