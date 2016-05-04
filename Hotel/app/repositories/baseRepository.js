'use strict';

const sql = require('mssql');
const tablesInfo = require('../constants');
const moment = require('moment')
const isNumeric = require('../helpers').isNumeric

function getPropertyCollection(object) {
    return Object.keys(object).map(x => {
        return {
            name: x,
            value: object[x]
        }
    })
}

function getFilledParamsRequest(connection, properties, types) {
    let request = connection.request()
    const getTypeName = (name) => {
        const symbols = name.split('')
        let typeName = ''
        symbols.forEach(x => {
            if (!isNumeric(x)) {
                typeName += x
            } else {
                return;
            }
        })

        return typeName
    }

    properties.forEach(x => {
        request = request.input(x.name, types[getTypeName(x.name)], x.value)
    })
    return request
}

function getConnectionString(user) {
    return tablesInfo.ConnectionString
        .replace('@login', user.login)
        .replace('@password', user.password);
}

function createSelectQuery(sqlInstance, data, tableName) {
    const object = data.object
    const types = data.types

    return sqlInstance.connect().then((connection) => {
        let properties = getPropertyCollection(object);
        let queryString = `select * from ${tableName}`;
        let request = getFilledParamsRequest(connection, properties, types);

        if (properties.length == 0) {
            return request.query(queryString);
        }

        let equalString = []
        properties.forEach(x => {
            if (types.strongEqual.indexOf(x.name) !== -1) {
                equalString.push(`${x.name} = @${x.name}`)
            } else {
                equalString.push(`${x.name} like '%' + @${x.name} + '%'`)
            }

        })


        queryString = queryString + ` where ${equalString.join(' and ')}`;
        return request.query(queryString);
    });
}

function getInsertPreparedQuery(sqlInstance, data, tableName) {
    const object = data.object
    const types = data.types

    return sqlInstance.connect().then((connection) => {
        let properties = getPropertyCollection(object);
        let propNames = properties.map(x => x.name).join(',');
        let propSpecialNames = properties.map(x => '@' + x.name).join(',');
        let queryString = `insert into ${tableName} (${propNames}) values (${propSpecialNames})`;
        let request = getFilledParamsRequest(connection, properties, types);
        return request.query(queryString);
    });
}

function getDeletePreparedQuery(sqlInstance, data, tableName) {
    const objects = data.objects
    const types = data.types

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
        const request = getFilledParamsRequest(connection, nameAndValues, types);
        return request.query(queryString);
    });
}

function getUpdatePreparedQuery(sqlInstance, data, tableName) {
    const types = data.types

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
        const request = getFilledParamsRequest(connection, changeParamNameToName(newProperties.concat(oldProperties)), types);
        return request.query(queryString);
    });
}

class BaseRepository {
    constructor(user) {
        this.sqlInstance = {
            connect: () => sql.connect(getConnectionString(user))
        };
    }

    getObjects(data, tableName) {
        return createSelectQuery(this.sqlInstance, data, tableName);
    }

    insertObject(data, tableName) {
        return getInsertPreparedQuery(this.sqlInstance, data, tableName);
    }

    deleteObject(data, tableName) {
        return getDeletePreparedQuery(this.sqlInstance, data, tableName);
    }

    updateObject(data, tableName) {
        return getUpdatePreparedQuery(this.sqlInstance, data, tableName);
    }
}

module.exports = BaseRepository;