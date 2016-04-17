'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class RoomRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        delete object.Id;
        return super.getObjects(object, constants.Rooms)
    }

    insert(room) {
        return super.insertObject(room, constants.Rooms)
    }

    delete(rooms) {
        return super.deleteObject(rooms, constants.Rooms)
    }

    update(oldObject, newObject) {
        if (oldObject.Id !== newObject.Id) {
            return Promise.reject(new Error('the ids should be the same'));
        }
        delete newObject.Id;
        return super.updateObject({oldObject, newObject}, constants.Rooms);
    }
}

module.exports = RoomRepository;