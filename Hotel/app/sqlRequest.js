'use strict';

let sql = require('mssql');
let tablesInfo = require('./constants');

function createSelectQuery(sqlInstance, tableName){
    return sqlInstance.connect().then(() => {
        return new sql.Request().query('select * from ' + tableName);
    });
}

function getPropertyCollection(object){
    let properties = [];
    for (let propName in object) {
        let data = {
            name : `${propName}`,
            value : `${object[propName]}`
        };
        properties.push(data);
    }

    return properties;
}

function getFilledParamsRequest(sqlInstance,  properties){
    let request =  sqlInstance.createRequest();
    properties.forEach(x => {
        request = request.input(x.name, x.value);
    });
    return request;
}

function getInsertPreparedQuery(sqlInstance, object, tableName){
    return sqlInstance.connect().then(() => {

        let properties = getPropertyCollection(object);
        let propNames =  properties.map(x => x.name).join(',');
        let propSpecialNames =  properties.map(x => '@' + x.name).join(',');
        let queryString = `insert into ${tableName} (${propNames}) values (${propSpecialNames})`;
        let request = getFilledParamsRequest(sqlInstance, properties);
        return request.query(queryString);
    });
}

function getDeletePreparedQuery(sqlInstance, object, tableName){
    return sqlInstance.connect().then(() => {
        let properties = getPropertyCollection(object);
        let equalString = properties.map(x => `${x.name} = @${x.name}`).join(' and ');
        let queryString =`delete from ${tableName} where ${equalString}`;
        let request = getFilledParamsRequest(sqlInstance, properties);
        return request.query(queryString);
    });
}

function getConnectionString(user){
    return tablesInfo.ConnectionString
        .replace('@login', user.login)
        .replace('@password', user.password);
}

class BaseSqlRequest{
    constructor(user){
        this.sqlInstance = {
            connect : () => sql.connect(getConnectionString(user)),
            createRequest : () => new sql.Request
        };
    }

    getObjects(tableName) {
        return createSelectQuery(this.sqlInstance, tableName);
    }
    insertObject(object, tableName) {
        return getInsertPreparedQuery(this.sqlInstance, object, tableName);
    }

    deleteObject(object, tableName) {
        return getDeletePreparedQuery(this.sqlInstance, object, tableName);
    }
}

class SqlRequest extends BaseSqlRequest{
    constructor(user){
        super(user);
    }
    getClients() {
        return super.getObjects(tablesInfo.Clients);
    }
    getRooms() {
        return super.getObjects(tablesInfo.Rooms);
    }
    getRoomClients() {
        return super.getObjects(tablesInfo.RoomClient);
    }
    getRoomReservations() {
        return super.getObjects(tablesInfo.RoomReservation);
    }
    deleteBestClientInfo(year) {
        sql.connect(tablesInfo.ConnectionString).then(() => {
            return new sql.Request()
                .input('year', sql.Int, year)
                .execute('DeleteBestClientInfo');
        });
    }
    insertClient(client){
        return super.insertObject(client, tablesInfo.Clients);
    }
    insertRoom(room){
        return super.insertObject(room, tablesInfo.Rooms);
    }
    insertRoomClient(roomClient){
        return super.insertObject(roomClient, tablesInfo.RoomClient);
    }
    insertRoomReservation(roomReservation){
        return super.insertObject(roomReservation, tablesInfo.RoomReservation);
    }
    deleteClient(client){
        return super.deleteObject(client, tablesInfo.Clients);
    }
    deleteRoom(room){
        return super.deleteObject(room, tablesInfo.Rooms);
    }
    deleteRoomClient(room){
        return super.deleteObject(room, tablesInfo.RoomClient);
    }
    deleteRoomReservation(room){
        return super.deleteObject(room, tablesInfo.RoomReservation);
    }
}

module.exports = SqlRequest;

