'use strict';

let sql = require('mssql');

let tablesInfo = require('../constants');

function createSelectQuery(sqlInstance, object, tableName) {
    return sqlInstance.connect().then((connection) => {
        let properties = getPropertyCollection(object);
        let queryString = `select * from ${tableName}`;
        let request = getFilledParamsRequest(connection, properties);

        if (properties.length == 0) {
            return request.query(queryString);
        }

        let equalString = properties.map(x => `${x.name} like '%' + @${x.name} + '%'`).join(' and ');
        queryString = queryString + ` where ${equalString}`;
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
        let sqlType;
        switch (typeof x.value){
            case 'boolean':
                sqlType = sql.boolean;
                break;
            case 'number' :
                sqlType = sql.Int;
                break;
            case 'string' :
                sqlType = sql.NVarChar(100);
                break;
        }
        request = request.input(x.name, sqlType, x.value);
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

function getDeletePreparedQuery(sqlInstance, objects, tableName) {
    return sqlInstance.connect().then((connection) => {
        let resultEqualString = '';
        let nameAndValues = [];
        objects.forEach((object, i) => {
            let properties = getPropertyCollection(object);
            properties.forEach((pair) => {
                nameAndValues.push({
                    name: pair.name + i,
                    value: pair.value
                });
            });
            let equalString = properties.map(x => `${x.name} = @${x.name}${i}`).join(' and ');

            const orSign = ' or';
            resultEqualString += i == 0
                ? equalString
                : `${orSign} ${equalString}`

        });
        const queryString = `delete from ${tableName} where ${resultEqualString}`;
        const request = getFilledParamsRequest(connection, nameAndValues);
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

        const oldProperties = convertList(getPropertyCollection(data.oldObject), 'old');
        const newProperties = convertList(getPropertyCollection(data.newObject), 'new');

        let changeParamNameToName = (list) => list.map(x => {
            return {
                name: x.paramName,
                value: x.value
            }
        });

        const assignString = newProperties.map(x => `${x.name} = @${x.paramName}`).join(', ');
        const equalString = oldProperties.map(x => `${x.name} = @${x.paramName}`).join(' and ');

        const queryString = `update ${tableName} set ${assignString} where ${equalString}`;
        const request = getFilledParamsRequest(connection, changeParamNameToName(newProperties.concat(oldProperties)));
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

    deleteObject(objects, tableName) {
        return getDeletePreparedQuery(this.sqlInstance, objects, tableName);
    }

    updateObject(data, tableName) {
        return getUpdatePreparedQuery(this.sqlInstance, data, tableName);
    }
}

module.exports = BaseRepository;