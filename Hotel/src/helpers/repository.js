import $ from 'jquery';
import {urls, verbs} from './constants';

function getAjaxRequest(verb, data, restUrl) {
    debugger;
    return $.ajax({
        type: verb,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `http://localhost:3000/${restUrl}`
    })
}

function getQuery(object) {
    if (!object)
        return '';

    let query = '?';
    for (let prop in object) {
        query += `${prop}=${object[prop]}`;
    }

    return query;
}


class Repository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    getAll(object) {
        return getAjaxRequest(verbs.get, object, this.tableName + getQuery(object));
    }

    insert(object) {
        return getAjaxRequest(verbs.post, object, this.tableName);
    }

    update(oldObject, newObject) {
        return getAjaxRequest(verbs.put, {oldObject, newObject}, this.tableName);
    }

    delete(object) {
        return getAjaxRequest(verbs.delete, object, this.tableName);
    }
}

export default class SqlContext{
    static [urls.clients](){
        return new Repository(urls.clients);
    }

    static [urls.rooms](){
        return new Repository(urls.rooms);
    }

    static [urls.roomClients](){
        return new Repository(urls.roomClients);
    }

    static [urls.roomReservations](){
        return new Repository(urls.roomReservations);
    }
}