'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class ClientRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        if (object.Sex) {
            object.Sex = object.Sex === 'true'
        }
        return super.getObjects(object, constants.Clients)
    }

    insert(object) {
        delete object.Id;
        object.Sex = object.Sex === 'true'
        return super.insertObject(object, constants.Clients)
    }

    delete(clients) {
        clients.forEach(x=> x.Sex = x.Sex === 'true')
        return super.deleteObject(clients, constants.Clients)
    }

    update(oldObject, newObject) {
        if (oldObject.Id !== newObject.Id) {
            return Promise.reject(new Error('the ids should be the same'));
        }
        oldObject.Sex = oldObject.Sex === 'true'
        newObject.Sex = newObject.Sex === 'true'
        delete newObject.Id;
        return super.updateObject({oldObject, newObject}, constants.Clients);
    }

    deleteBestClientInfo(year) {
        return this.sqlInstance.connect().then(() => {
            let request = this.sqlInstance.createRequest();

            return request
                .input('year', year)
                .execute('DeleteBestClientInfo');
        });
    }
}

module.exports = ClientRepository;