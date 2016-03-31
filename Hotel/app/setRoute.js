'use strict';

let SqlContext = require('./repositories/sqlContext');

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
                    console.log(err);
                    res.send('there was an error');
                });
        })
        .post((req, res) => {
            getContext(req)[contextName]().insert(req.body.object)
                .then(() => {
                    res.send('Success');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('there was an error');
                })
        })
        .put((req, res) => {
            getContext(req)[contextName]().update(req.body.oldObject, req.body.newObject)
                .then(() => {
                    res.send('Success');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('there was an error');
                })
        })
        .delete((req, res) => {
            getContext(req)[contextName]().delete(req.body.object)
                .then(() => {
                    res.send('Success');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('there was an error');
                })
        });
}

module.exports = setRoute;