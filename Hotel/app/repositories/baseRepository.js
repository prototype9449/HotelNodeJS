'use strict';

let sql = require('mssql');
let tablesInfo = require('../constants');

function createSelectQuery(sqlInstance, tableName) {
    return sqlInstance.connect().then(() => {
        return new sql.Request().query('select * from ' + tableName);
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

function getFilledParamsRequest(sqlInstance, properties) {
    let request = sqlInstance.createRequest();
    properties.forEach(x => {
        request = request.input(x.name, x.value);
    });
    return request;
}

function getInsertPreparedQuery(sqlInstance, object, tableName) {
    return sqlInstance.connect().then(() => {
        let properties = getPropertyCollection(object);
        let propNames = properties.map(x => x.name).join(',');
        let propSpecialNames = properties.map(x => '@' + x.name).join(',');
        let queryString = `insert into ${tableName} (${propNames}) values (${propSpecialNames})`;
        let request = getFilledParamsRequest(sqlInstance, properties);
        return request.query(queryString);
    });
}

function getDeletePreparedQuery(sqlInstance, object, tableName) {
    return sqlInstance.connect().then(() => {
        let properties = getPropertyCollection(object);
        let equalString = properties.map(x => `${x.name} = @${x.name}`).join(' and ');
        let queryString = `delete from ${tableName} where ${equalString}`;
        let request = getFilledParamsRequest(sqlInstance, properties);
        return request.query(queryString);
    });
}

function getConnectionString(user) {
    return tablesInfo.ConnectionString
        .replace('@login', user.login)
        .replace('@password', user.password);
}

function getUpdatePreparedQuery(sqlInstance, data, tableName) {
    return sqlInstance.connect().then(() => {
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
        let request = getFilledParamsRequest(sqlInstance, changeParamNameToName(newProperties.concat(oldProperties)));
        return request.query(queryString);
    });
}

class BaseRepository {
    constructor(user) {
        this.sqlInstance = {
            connect: () => sql.connect(getConnectionString(user)),
            createRequest: () => new sql.Request()
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

    updateObject(data, tableName) {
        return getUpdatePreparedQuery(this.sqlInstance, data, tableName);
    }
}

module.exports = BaseRepository;