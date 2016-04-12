'use strict';

let SqlContext = require('./repositories/sqlContext');

function getContext(request) {
    return new SqlContext({
            login: request.cookies.login,
            password: request.cookies.password
        }
    );
}

function getError(err, responce, data) {
    console.log(err);
        responce.set({
            'Content-Type': 'application/json',
            'Status': '409'
        });
        responce.send(JSON.stringify({ message : data}));
}

function getSuccess(responce, data) {
        responce.set({
            'Status': '202',
            'Content-Type': 'application/json'
        });
        responce.send(JSON.stringify({ message : data}));
}

function setRoute(app, contextName) {
    app.route('/' + contextName)
        .get((req, res) => {
            getContext(req)[contextName]().getAll(req.query)
                .then((objects) => {
                    res.send(objects);
                })
                .catch((err) => {
                    getError(err, res,'there was an error');
                });
        })
        .post((req, res) => {
            getContext(req)[contextName]().insert(req.body.object)
                .then(() => getSuccess(res,'Success'))
                .catch((err) => {
                    getError(err, res,'there was an error');
                })
        })
        .put((req, res) => {
            getContext(req)[contextName]().update(req.body.oldObject, req.body.newObject)
                .then(() => getSuccess(res,'Success'))
                .catch((err) => {
                    getError(err, res,'there was an error');
                })
        })
        .delete((req, res) => {
            getContext(req)[contextName]().delete(req.body.object)
                .then(() => getSuccess(res,'Success'))
                .catch((err) => {
                    getError(err, res,'there was an error');
                })
        });
}

module.exports = setRoute;