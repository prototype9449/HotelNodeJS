'use strict';
let BaseRepository = require('./baseRepository');
let constants = require('../constants.json');

class ClientRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        delete object.Id;
        return super.getObjects(object, constants.Clients).then((clients) => {
            clients.forEach(x => x.Sex = x.Sex ==true ? 'Man' : 'Woman');
            return clients;
        });
    }

    insert(client) {
        return super.insertObject(client, constants.Clients);
    }

    delete(client) {
        return super.deleteObject(client, constants.Clients);
    }

    update(oldObject, newObject) {
        if (oldObject.Id !== newObject.Id) {
            return Promise.reject(new Error('the ids should be the same'));
        }
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