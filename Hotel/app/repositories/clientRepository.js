'use strict';
const BaseRepository = require('./baseRepository');
const constants = require('../constants.json');
const sql = require('mssql');

const types = {
    Id: sql.NVarChar(10),
    FullName: sql.NVarChar(100),
    Passport: sql.NVarChar(100),
    Sex: sql.Bit,
    strongEqual: ['Sex']
}

class ClientRepository extends BaseRepository {
    constructor(user) {
        super(user);
    }

    getAll(object) {
        if (object.Sex) {
            object.Sex = object.Sex === 'true'
        }
        return super.getObjects({types, object}, constants.Clients)
    }

    insert(object) {
        delete object.Id;
        object.Sex = object.Sex === 'true'
        return super.insertObject({types, object}, constants.Clients)
    }

    delete(objects) {
        objects.forEach(x=> x.Sex = x.Sex === 'true')
        return super.deleteObject({types, objects}, constants.Clients)
    }

    update(oldObject, newObject) {
        if (oldObject.Id !== newObject.Id) {
            return Promise.reject(new Error('the ids should be the same'));
        }
        oldObject.Sex = oldObject.Sex === 'true'
        newObject.Sex = newObject.Sex === 'true'
        delete newObject.Id;
        return super.updateObject({types, oldObject, newObject}, constants.Clients);
    }

    deleteBestClientInfo(year) {
        return this.sqlInstance.connect().then((connection) => {
            const request = connection.request();

            return request
                .input('year', +year)
                .execute('DeleteBestClientInfo');
        });
    }
}

module.exports = ClientRepository;