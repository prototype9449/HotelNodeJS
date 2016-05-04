'use strict';
const sql = require('mssql');
const BaseRepository = require('./baseRepository');
const constants = require('../constants.json');
const types = {
    Id: sql.NVarChar(10),
    Floor: sql.NVarChar(10),
    Comfort: sql.NVarChar(10),
    Price: sql.Money,
    Occupation: sql.Bit,
    strongEqual: ['Occupation', 'Price']
}

class RoomRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        if (object.Occupation) {
            object.Occupation = object.Occupation === 'true'
        }
        return super.getObjects({types, object}, constants.Rooms)
    }

    insert(object) {
        delete object.Id;
        object.Occupation = object.Occupation === 'true'
        return super.insertObject({types, object}, constants.Rooms)
    }

    delete(objects) {
        return super.deleteObject({types, objects}, constants.Rooms)
    }

    update(oldObject, newObject) {
        if (oldObject.Id !== newObject.Id) {
            return Promise.reject(new Error('the ids should be the same'));
        }
        delete newObject.Id;
        oldObject.Occupation = oldObject.Occupation === 'true'
        newObject.Occupation = newObject.Occupation === 'true'
        return super.updateObject({types, oldObject, newObject}, constants.Rooms);
    }
}

module.exports = RoomRepository;