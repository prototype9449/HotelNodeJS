'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class RoomRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll() {
        return super.getObjects(constants.Rooms);
    }

    insert(room) {
        return super.insertObject(room, constants.Rooms);
    }

    delete(room) {
        return super.deleteObject(room, constants.Rooms);
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