'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class RoomClientRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        return super.getObjects(object, constants.RoomClient);
    }

    insert(roomClient) {
        return super.insertObject(roomClient, constants.RoomClient);
    }

    delete(rooms) {
        return super.deleteObject(rooms, constants.RoomClient);
    }

    update(oldObject, newObject) {
        return super.updateObject({oldObject, newObject}, constants.RoomClient);
    }
}

module.exports = RoomClientRepository;