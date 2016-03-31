'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class RoomClientRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll() {
        return super.getObjects(constants.RoomClient);
    }

    insert(roomClient) {
        return super.insertObject(roomClient, constants.RoomClient);
    }

    delete(room) {
        return super.deleteObject(room, constants.RoomClient);
    }

    update(oldObject, newObject) {
        return super.updateObject({oldObject, newObject}, constants.RoomClient);
    }
}

module.exports = RoomClientRepository;