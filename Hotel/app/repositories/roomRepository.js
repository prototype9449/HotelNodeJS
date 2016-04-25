'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class RoomRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        if (object.Occupation) {
            object.Occupation = object.Occupation ==='true'
        }
        return super.getObjects(object, constants.Rooms)
    }

    insert(object) {
        delete object.Id;
        object.Occupation = object.Occupation ==='true'
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
        oldObject.Occupation = oldObject.Occupation ==='true'
        newObject.Occupation = newObject.Occupation ==='true'
        return super.updateObject({oldObject, newObject}, constants.Rooms);
    }
}

module.exports = RoomRepository;