'use strict';

const SqlContext = require('./repositories/sqlContext');
const getSuccess = require('./helpers/responseHelper').getSuccess
const getError = require('./helpers/responseHelper').getError

function getContext(request) {
    return new SqlContext({
            login: request.cookies.login,
            password: request.cookies.password
        }
    );
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
            getContext(req)[contextName]().delete(req.body.objects)
                .then(() => getSuccess(res,'Success'))
                .catch((err) => {
                    getError(err, res,'there was an error');
                })
        });
}

module.exports = setRoute;