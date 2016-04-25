import $ from 'jquery';
import {urls, verbs} from './../constants/utils';

function getAjaxRequest(verb, data, restUrl) {
    return $.ajax({
        type: verb,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `http://localhost:3001/${restUrl}`
    });
}

function getQuery(object) {
    if (!object)
        return '';

    const props = Object.keys(object).map(x => {
        return `${x}=${object[x]}`
    })
    return `?${props.join('&')}`;
}


class Repository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    getAll(object) {
        return getAjaxRequest(verbs.get, undefined, this.tableName + getQuery(object));
    }

    insert(object) {
        return getAjaxRequest(verbs.post, {object}, this.tableName);
    }

    update(oldObject, newObject) {
        return getAjaxRequest(verbs.put, {oldObject, newObject}, this.tableName);
    }

    delete(...objects) {
        return getAjaxRequest(verbs.delete, {objects}, this.tableName);
    }
}

export default class SqlContext {
    static get [urls.clients]() {
        return new Repository(urls.clients);
    }

    static get [urls.rooms]() {
        return new Repository(urls.rooms);
    }

    static get [urls.roomClient]() {
        return new Repository(urls.roomClient);
    }

    static get [urls.roomReservation]() {
        return new Repository(urls.roomReservation);
    }
}