'use strict';

let sql = require('mssql');
let tablesInfo = require('../constants');

function createSelectQuery(sqlInstance, object, tableName) {
    return sqlInstance.connect().then((connection) => {
        let properties = getPropertyCollection(object);
        let queryString = `select * from ${tableName}`;
        let request = getFilledParamsRequest(connection, properties);

        if(properties.length == 0){
            return request.query(queryString);
        }

        let equalString = properties.map(x => `${x.name} like '%' + @${x.name} + '%'`).join(' and ');
        queryString = queryString +` where ${equalString}`;
        return request.query(queryString);
    });
}

function getPropertyCollection(object) {
    let properties = [];
    for (let propName in object) {
        let data = {
            name: `${propName}`,
            value: `${object[propName]}`
        };
        properties.push(data);
    }

    return properties;
}

function getFilledParamsRequest(connection, properties) {
    let request = connection.request();
    properties.forEach(x => {
        request = request.input(x.name, x.value);
    });
    return request;
}

function getInsertPreparedQuery(sqlInstance, object, tableName) {
    return sqlInstance.connect().then((connection) => {
        let properties = getPropertyCollection(object);
        let propNames = properties.map(x => x.name).join(',');
        let propSpecialNames = properties.map(x => '@' + x.name).join(',');
        let queryString = `insert into ${tableName} (${propNames}) values (${propSpecialNames})`;
        let request = getFilledParamsRequest(connection, properties);
        return request.query(queryString);
    });
}

function getDeletePreparedQuery(sqlInstance, object, tableName) {
    return sqlInstance.connect().then((connection) => {
        let properties = getPropertyCollection(object);
        let equalString = properties.map(x => `${x.name} = @${x.name}`).join(' and ');
        let queryString = `delete from ${tableName} where ${equalString}`;
        let request = getFilledParamsRequest(connection, properties);
        return request.query(queryString);
    });
}

function getConnectionString(user) {
    return tablesInfo.ConnectionString
        .replace('@login', user.login)
        .replace('@password', user.password);
}

function getUpdatePreparedQuery(sqlInstance, data, tableName) {
    return sqlInstance.connect().then((connection) => {
        let convertList = (list, word) => list.map(x => {
            return {
                name: x.name,
                value: x.value,
                paramName: word + x.name
            }
        });

        let oldProperties = convertList(getPropertyCollection(data.oldObject), 'old');
        let newProperties = convertList(getPropertyCollection(data.newObject), 'new');

        let changeParamNameToName = (list) => list.map(x => {
            return {
                name: x.paramName,
                value: x.value
            }
        });

        let assignString = newProperties.map(x => `${x.name} = @${x.paramName}`).join(', ');
        let equalString = oldProperties.map(x => `${x.name} = @${x.paramName}`).join(' and ');

        let queryString = `update ${tableName} set ${assignString} where ${equalString}`;
        let request = getFilledParamsRequest(connection, changeParamNameToName(newProperties.concat(oldProperties)));
        return request.query(queryString);
    });
}

class BaseRepository {
    constructor(user) {
        this.sqlInstance = {
            connect: () => sql.connect(getConnectionString(user))
        };
    }

    getObjects(object, tableName) {
        return createSelectQuery(this.sqlInstance, object, tableName);
    }

    insertObject(object, tableName) {
        return getInsertPreparedQuery(this.sqlInstance, object, tableName);
    }

    deleteObject(object, tableName) {
        return getDeletePreparedQuery(this.sqlInstance, object, tableName);
    }

    updateObject(data, tableName) {
        return getUpdatePreparedQuery(this.sqlInstance, data, tableName);
    }
}

module.exports = BaseRepository;