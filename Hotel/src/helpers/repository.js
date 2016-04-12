import $ from 'jquery';
import {urls, verbs} from './constants';

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
        url: `http://localhost:3000/${restUrl}`
    });
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
        return getAjaxRequest(verbs.post, {object}, this.tableName);
    }

    update(oldObject, newObject) {
        return getAjaxRequest(verbs.put, {oldObject, newObject}, this.tableName);
    }

    delete(...objects) {
        if(objects.length == 1){
            let object = objects[0];
            getAjaxRequest(verbs.delete, {object}, this.tableName);
        } else{
            objects.forEach(object => getAjaxRequest(verbs.delete, {object}, this.tableName))
        }
        
    }
}

export default class SqlContext{
    static [urls.clients](){
        return new Repository(urls.clients);
    }

    static [urls.rooms](){
        return new Repository(urls.rooms);
    }

    static [urls.roomClient](){
        return new Repository(urls.roomClient);
    }

    static [urls.roomReservation](){
        return new Repository(urls.roomReservation);
    }
}